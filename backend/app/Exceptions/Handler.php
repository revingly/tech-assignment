<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // Override the default behavior for not found exceptions to return a 404 json response.
        $this->renderable(function (NotFoundHttpException $e, Request $request) {
            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());
            $message = "Not found.";
            if (config('app.debug')) $message = $e->getMessage();
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $message
                ], 404);
            }
        });
    }
}
