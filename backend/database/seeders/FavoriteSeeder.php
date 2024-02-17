<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all user and movie IDs
        $userIds = User::pluck('id')->toArray();
        $movieIds = Movie::pluck('id')->toArray();

        // Randomly favorite movies for each user
        foreach ($userIds as $userId) {
            // Randomly select a few movies to favorite
            $favoriteMovieIds = array_rand(array_flip($movieIds), rand(5, 10));

            // Attach the favorite movies to the user
            User::find($userId)->favorites()->attach($favoriteMovieIds);
        }
    }
}
