<?php

namespace Tests\Feature;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class MovieTest extends TestCase
{
    use WithFaker, refreshDatabase;

    public function test_search_by_name_movie_exist(): void
    {
        Http::fake([
            'https://api.themoviedb.org/3/*' => Http::response(self::mockDataWithResult()),
        ]);
        $response = $this
            ->actingAs(User::factory()->create())
            ->getJson(route('movies.searchByName', [
                'name' => $this->faker->name,
            ]));

        $response->assertStatus(200);
        $response->assertJsonStructure(['page', 'results', 'total_pages', 'total_results']);
        $response->assertJsonCount(1, 'results');
    }

    public function test_search_by_name_movie_not_exist(): void
    {
        Http::fake([
            'https://api.themoviedb.org/3/*' => Http::response(self::mockDataWithoutResult()),
        ]);
        $response = $this
            ->actingAs(User::factory()->create())
            ->getJson(route('movies.searchByName', [
                'name' => $this->faker->name,
            ]));

        $response->assertStatus(200);
        $response->assertJsonStructure(['page', 'results', 'total_pages', 'total_results']);
        $response->assertJsonCount(0, 'results');
    }

    public function test_store_movie_ok_response(): void
    {
        $response = $this
            ->actingAs(User::factory()->create())
            ->postJson(route('movies.favorite.add'), [
                "original_title" => "batman",
                "overview" => "batman movie",
                "type" => "MOVIE",
                "genre" => "Action",
                "release_date" => "05/11/2022",
                "poster_img" => "image here",
            ]);

        // Assert
        $this->assertSame(Response::HTTP_CREATED, $response->getStatusCode());
    }

    public function test_show_movie_returns_json_response(): void
    {
        $movie = Movie::factory()->create();
        $user = User::factory()->make();
        $response = $this->actingAs($user)->getJson(route('movies.show', ['movie' => $movie->id]));

        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
        $response->assertJsonStructure(['id', 'original_title', 'overview', 'genre', 'type','release_date']);
    }

}
