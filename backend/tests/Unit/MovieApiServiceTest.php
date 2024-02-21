<?php

namespace Tests\Unit;

use App\Services\MovieApiService;
use Illuminate\Http\Client\Factory;
use Illuminate\Support\Facades\Http;
use Mockery;
use Tests\TestCase;

class MovieApiServiceTest extends TestCase
{
    private MovieApiService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = new MovieApiService();
        $this->apiMock = Mockery::mock(Factory::class);
    }

    public function test_movie_found()
    {
        Http::fake([
            'https://api.themoviedb.org/3/*' => Http::response(self::mockDataWithResult()),
        ]);
        $this->apiMock->shouldReceive('findBy')
            ->with('search/movie?api_key=123&query=batman');

        $result = $this->service->findBy('batman');
        $this->assertNotEquals(0, $result['total_results']);
    }
    public function test_no_movie_found()
    {
        Http::fake([
            'https://api.themoviedb.org/3/*' => Http::response(self::mockDataWithoutResult()),
        ]);
        $this->apiMock->shouldReceive('findBy')
            ->with('search/movie?api_key=123&query=moviedoesntexist');

        $result = $this->service->findBy('moviedoesntexist');

        $this->assertEquals(['page' => 1, 'results' => [], 'total_pages' => 1, 'total_results' => 0], $result);
    }

    public function test_popular_movies()
    {
        Http::fake([
            'https://api.themoviedb.org/3/*' => Http::response(self::mockDataWithResult()),
        ]);
        $this->apiMock->shouldReceive('popular')
            ->with('movie/popular?api_key=123');

        // Call method
        $result = $this->service->popular();

        $this->assertArrayHasKey('results', $result);
        $this->assertNotEquals(0, $result['total_results']);
    }

    public function test_trending_movies()
    {
        Http::fake([
            'https://api.themoviedb.org/3/*' => Http::response(self::mockDataWithResult()),
        ]);
        $this->apiMock->shouldReceive('trending')
            ->with('trending/movie/week?api_key=123');

        $result = $this->service->trending();

        $this->assertArrayHasKey('results', $result);
        $this->assertNotEquals(0, $result['total_results']);
    }
}
