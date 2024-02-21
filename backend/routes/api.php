<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SendEmailVerificationNotificationController;
use App\Http\Controllers\Auth\SendPasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->group(function () {
    // These routes will call the MovieApiService to get the movie data
    Route::get('movies/search', [MovieController::class, 'searchByName'])->name('movies.searchByName');
    Route::get('movies/popular', [MovieController::class, 'popular'])->name('movies.popular');
    Route::get('movies/trending', [MovieController::class, 'trending'])->name('movies.trending');

    // These routes will call the database to get the data
    Route::get('movies/{movie}', [MovieController::class, 'show'])->name('movies.show');
    Route::post('movies', [MovieController::class, 'store'])->name('movies.favorite.add');
    Route::delete('movies/{movie}', [MovieController::class, 'remove'])->name('movies.favorite.remove');

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::post('refresh', [AuthController::class, 'refresh'])->name('auth.refresh');
    Route::get('me', [AuthController::class, 'me'])->name('auth.me');
});

Route::post('/forgot-password', SendPasswordResetLinkController::class)->name('password.email');

Route::post('/reset-password', ResetPasswordController::class)->name('password.update');

Route::middleware('auth:api')->group(function () {
    Route::post('/email/verification-notification', SendEmailVerificationNotificationController::class)
        ->middleware(['throttle:6,1'])
        ->name('verification.send');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
});
