<?php

namespace App\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Http::macro('movie', function () {
            return Http::withHeaders([
                'Accept' => 'application/json',
            ])->baseUrl(config('api.endpoints.movie.url'),);
        });
    }
}
