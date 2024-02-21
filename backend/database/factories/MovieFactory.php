<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $response = Http::get('https://jsonfakery.com/movies/random')->object();
        return [
            'original_title' => $response->original_title,
            'overview' => $response->overview,
            'genre' => 'action',
            'type' => 'MOVIE',
            'poster_img' => $response->poster_path,
            'release_date' => $response->release_date,
        ];
    }
}
