<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use WithFaker, refreshDatabase;

    public function test_can_create_a_new_user()
    {
        $this->assertDatabaseCount('users', 0);

        $user = User::factory()->make();
        $response = $this
            ->actingAs($user)
            ->postJson(route('auth.register'), [
                'name' => $this->faker->name,
                'email' => $this->faker->safeEmail,
                'password' => 'qweasdzxc',
                'password_confirmation' => 'qweasdzxc',
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseCount('users', 1);
    }

    public function test_user_can_login()
    {
        $userData = [
            'email' => $this->faker->email,
            'password' => $this->faker->password,
        ];
        User::factory()->create(['email' => $userData['email'], 'password' => $userData['password']]);

        $response = $this
            ->postJson(route('auth.login'), $userData);

        $response->assertStatus(200);
        $response->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }

    public function test_user_can_logout()
    {
        $userData = [
            'email' => $this->faker->email,
            'password' => $this->faker->password,
        ];
        $user = User::factory()->create(['email' => $userData['email'], 'password' => $userData['password']]);

        $response = $this
            ->actingAs($user)
            ->postJson(route('auth.login'), $userData);

        $response->assertStatus(200);
        $response->assertJsonStructure(['access_token', 'token_type', 'expires_in']);

        $response = $this
            ->actingAs($user)
            ->postJson(route('auth.logout'));

        $response->assertStatus(200);
        $response->assertJsonStructure(['message']);
    }

    public function test_unauthenticated_user_cannot_access_protected_route(): void
    {
        $response = $this->getJson(route('auth.me'));

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }

    public function test_email_verification()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->actingAs($user)->getJson($verificationUrl);

        Event::assertDispatched(Verified::class);
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        $response->assertJson([
            'status' => 'email-verified',
        ]);
    }

    public function test_email_verification_with_invalid_hash(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1(fake()->email)]
        );

        $response = $this->actingAs($user)->getJson($verificationUrl);

        $this->assertFalse($user->fresh()->hasVerifiedEmail());
        $response->assertForbidden();
    }

    public function test_password_reset_link_can_be_requested_for_an_email(): void
    {
        Notification::fake();

        $userEmail = $this->faker->email;

        $user = User::factory()->create([
            'email' => $userEmail,
        ]);

        $this->postJson(route('password.email'), [
            'email' => $userEmail,
        ]);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function test_password_can_be_reset_with_a_valid_token(): void
    {
        Notification::fake();

        $userEmail = $this->faker->email;

        $user = User::factory()->create([
            'email' => $userEmail,
        ]);

        $this->postJson(route('password.email'), [
            'email' => $userEmail,
        ]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $response = $this->postJson(route('password.update'), [
                'token'                 => $notification->token,
                'email'                 => $user->email,
                'password'              => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

            $response->assertSessionHasNoErrors();

            return true;
        });
    }

}
