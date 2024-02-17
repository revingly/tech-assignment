<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

class MovieApiService
{

    private Client $httpClient;
    private string $apiKey;

    public function __construct()
    {
        $this->httpClient = new Client([
            'base_uri' => config('api.endpoints.movie.url'),
            'headers' => ['Accept'=> 'application/json']
        ]);
        $this->apiKey = config('api.endpoints.movie.api_key');
    }

    /**
     * @param string $name
     * @return ResponseInterface
     * @throws GuzzleException
     */
    public function findBy(string $name): ResponseInterface
    {

        return $this->httpClient->get(sprintf("search/movie?api_key=%s&query=%s", $this->apiKey, $name), []);
    }
}
