<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public static function MockDataWithResult(): array
    {
        return [
            'page'=> 1,
            'results' => [
                [
                    'id' => 'e78feda7-c828-40b6-ba91-b94e9308964e',
                    'movie_id' => 756187,
                    'original_title' => 'Sneakerella',
                    'original_language' => 'en',
                    'overview' => 'When El, an aspiring sneaker designer from Queens, meets Kira King, the fiercely independent daughter of legendary basketball star and sneaker tycoon Darius King, sparks fly as the two bond over their mutual affinity for sneakers. With a little nudge from his best friend and a sprinkle of Fairy Godfather magic, El finds the courage to use his talent to pursue his dream of becoming a ‘legit’ sneaker designer in the industry.',
                    'popularity' => 16.82,
                    'poster_path' => 'https =>//image.tmdb.org/t/p/original/jJ07f8DTdeWnCKCwDzB4htLXKBN.jpg',
                    'backdrop_path' => 'https =>//image.tmdb.org/t/p/original/AfRgDih0N952YNipEHKS1t7PkEi.jpg',
                    'release_date' => 'Wed, 05/11/2022',
                    'vote_average' => 6,
                    'vote_count' => 76,
                    'adult' => 0,
                ]
            ],
            'total_pages' => 42573,
            'total_results' => 851460
        ];
    }

    public static function MockDataWithoutResult(): array
    {
        return [
            'page'=> 1,
            'results' => [],
            'total_pages' => 1,
            'total_results' => 0
        ];
    }
}
