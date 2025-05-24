<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\TurnoClase;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

const AUTH_SANCTION = 'auth:sanctum';

Route::post('auth/login', [AuthController::class, 'login']);

Route::prefix('usuarios')->group(function () {
    Route::post('/', [UsuarioController::class, 'store'])->name('usuarios.store');
    Route::get('/check-email/{email}', [UsuarioController::class, 'checkEmailExists'])
        ->middleware('throttle:5,1')
        ->name('usuarios.checkEmail');

    Route::middleware(AUTH_SANCTION)->group(function () {
        Route::get('/', [UsuarioController::class, 'index'])->name('usuarios.index');
        Route::get('/{id}', [UsuarioController::class, 'show'])->name('usuarios.show');
    });
});

Route::prefix('turnos-clase')->group(function () {
    Route::middleware(AUTH_SANCTION)->group(function () {
        Route::get('/user-inscription-status/{userId}', [TurnoClase::class, 'getAllWithUserInscriptionStatus'])
            ->name('turnos-clase.user-inscription-status');
        Route::get('/cupo-maximo/{idTurnoClase}', [TurnoClase::class, 'getCupoMaximoFromTurnoClase'])
            ->name('turnos-clase.cupo-maximo');
    });
});

Route::prefix('inscripciones')->group(function () {
    Route::middleware(AUTH_SANCTION)->group(function () {
        Route::post('/', [InscripcionController::class, 'inscribirUsuario'])
            ->name('inscripciones.inscribir-usuario');
        Route::delete('/{id_usuario}/{id_turno_clase}', [InscripcionController::class, 'cancelarInscripcion'])
            ->name('inscripciones.cancelar-inscripcion');
    });
});
