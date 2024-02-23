<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Requests\StoreMovieRequest;
use App\Repositories\MovieRepository;
use App\Services\MovieApiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class MovieController extends Controller
{
    private MovieRepository $movieRepository;
    private MovieApiService $movieApiService;

    public function __construct(MovieRepository $movieRepository, MovieApiService $movieApiService)
    {
        $this->movieRepository = $movieRepository;
        $this->movieApiService = $movieApiService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function searchByName(Request $request): JsonResponse
    {
        try {
            $res = $this->movieApiService->findBy($request->query('name'));

            return response()->json($res, Response::HTTP_OK);
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());
            Log::error($exception->getTraceAsString());

            return response()->json(["error" => "Api error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function details(int $movieId): JsonResponse
    {
        try {
            $res = $this->movieApiService->details($movieId);

            return response()->json($res, Response::HTTP_OK);
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());
            Log::error($exception->getTraceAsString());

            return response()->json(["error" => "Api error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param StoreMovieRequest $request
     * @return JsonResponse
     */
    public function store(StoreMovieRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $movie = $this->movieRepository->create($request->validated());

            $request->user()->favorites()->attach($movie);

            DB::commit();

            return response()->json($movie, Response::HTTP_CREATED);
        } catch (\Throwable $exception) {
            DB::rollBack();
            Log::error($exception->getMessage());
            Log::error($exception->getTraceAsString());

            return response()->json(["error" => "Api error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @param Movie $movie
     * @return JsonResponse
     */
    public function remove(Request $request, Movie $movie): JsonResponse
    {
        try {
            DB::beginTransaction();

            $request->user()->favorites()->detach($movie);

            DB::commit();

            return response()->json(["message" => "removed"], Response::HTTP_OK);
        } catch (\Throwable $exception) {
            DB::rollBack();
            Log::error($exception->getMessage());
            Log::error($exception->getTraceAsString());

            return response()->json(["error" => "Api error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie): JsonResponse
    {
        return response()->json($movie, Response::HTTP_OK);
    }

    /**
     * @return JsonResponse
     */
    public function popular(): JsonResponse
    {
        try {
            $res = $this->movieApiService->popular();
            return response()->json($res, Response::HTTP_OK);
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());
            Log::error($exception->getTraceAsString());

            return response()->json(["error" => "Api error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @return JsonResponse
     */
    public function trending(): JsonResponse
    {
        try {
            $res = $this->movieApiService->trending();
            return response()->json($res, Response::HTTP_OK);
        } catch (\Throwable $exception) {
            Log::error($exception->getMessage());
            Log::error($exception->getTraceAsString());

            return response()->json(["error" => "Api error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
