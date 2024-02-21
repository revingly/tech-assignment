<?php

namespace App\Services;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;

class MovieApiService
{

    private string $apiKey;
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('api.endpoints.movie.url');
        $this->apiKey = config('api.endpoints.movie.api_key');
    }

    /**
     * @param string $name
     * @return array
     * @throws RequestException
     */
    public function findBy(string $name): array
    {

        $response = Http::get(sprintf("%ssearch/movie?api_key=%s&query=%s", $this->baseUrl, $this->apiKey, $name));
        $response->throwUnlessStatus(200);
        return $response->json();
    }

    /**
     * @return array
     * @throws RequestException
     */
    public function popular(): array
    {
        $response = Http::movie()->get(sprintf("movie/popular?api_key=%s", $this->apiKey));
        $response->throwUnlessStatus(200);
        return $response->json();
    }

    /**
     * @return array
     * @throws RequestException
     */
    public function trending(): array
    {
        $response = Http::movie()->get(sprintf("trending/movie/week?api_key=%s", $this->apiKey));
        $response->throwUnlessStatus(200);
        return $response->json();
    }
}
