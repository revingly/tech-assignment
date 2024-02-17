<?php

return [
    'endpoints' => [
        'movie' => [
            'url' => env('MOVIE_API_ENDPOINT', ''),
            'api_key' => env('MOVIE_API_KEY', ''),
        ],
    ]
];
