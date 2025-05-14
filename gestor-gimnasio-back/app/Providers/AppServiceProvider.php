<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Interfaces\UsuarioRepositoryInterface;
use App\Http\Repositories\UsuarioRepository;
use App\Http\Interfaces\UsuarioServiceInterface;
use App\Http\Services\UsuarioService;
use App\Http\Interfaces\AuthServiceInterface;
use App\Http\Services\AuthService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            UsuarioRepositoryInterface::class,
            UsuarioRepository::class
        );

        $this->app->bind(
            UsuarioServiceInterface::class,
            UsuarioService::class
        );

        $this->app->bind(
            AuthServiceInterface::class,
            AuthService::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
