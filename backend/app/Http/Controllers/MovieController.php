<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Services\MovieApiService;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    private MovieApiService $movieApiService;

    public function __construct(MovieApiService $movieApiService)
    {
        $this->movieApiService = $movieApiService;
    }

    /**
     * Display a listing of the resource.
     * @throws GuzzleException
     */
    public function index(Request $request)
    {
        $res = $this->movieApiService->findBy($request->query('name'));
        return $res->getBody();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMovieRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movie $movie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMovieRequest $request, Movie $movie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        //
    }
}
