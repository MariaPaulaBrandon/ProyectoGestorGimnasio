<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\TurnoClase;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

if (!defined('AUTH_SANCTION')) {
    define('AUTH_SANCTION', 'auth:sanctum');
}

Route::post('auth/login', [AuthController::class, 'login']);

Route::middleware(AUTH_SANCTION)->group(function () {
    Route::prefix('usuarios')->group(function () {
        Route::post('/', [UsuarioController::class, 'store'])
            ->name('usuarios.store');
        Route::get('/check-email/{email}', [UsuarioController::class, 'checkEmailExists'])
            ->middleware('throttle:5,1')
            ->name('usuarios.checkEmail');
        Route::get('/', [UsuarioController::class, 'index'])
            ->name('usuarios.index');
        Route::get('/{id}', [UsuarioController::class, 'show'])
            ->name('usuarios.show');
    });

    Route::prefix('turnos-clase')->group(function () {
        Route::get('/', [TurnoClase::class, 'getAll'])
            ->name('turnos-clase.index');
        Route::put('/{id}', [TurnoClase::class, 'update'])
            ->name('turnos-clase.update');
        Route::get('/user-inscription-status/{userId}', [TurnoClase::class, 'getAllWithUserInscriptionStatus'])
            ->name('turnos-clase.user-inscription-status');
        Route::get('/cupo-maximo/{idTurnoClase}', [TurnoClase::class, 'getCupoMaximoFromTurnoClase'])
            ->name('turnos-clase.cupo-maximo');
        Route::post('/', [TurnoClase::class, 'create'])
            ->name('turnos-clase.create');
    });

    Route::prefix('inscripciones')->group(function () {
        Route::post('/', [InscripcionController::class, 'inscribirUsuario'])
            ->name('inscripciones.inscribir-usuario');
        Route::delete('/{id_usuario}/{id_turno_clase}', [InscripcionController::class, 'cancelarInscripcion'])
            ->name('inscripciones.cancelar-inscripcion');
    });

    Route::prefix('tipos-actividad')->group(function () {
        Route::get('/', [\App\Http\Controllers\TipoActividadController::class, 'index'])
            ->name('tipos-actividad.index');
        Route::post('/', [\App\Http\Controllers\TipoActividadController::class, 'create'])
            ->name('tipos-actividad.create');
    });

    Route::prefix('salas')->group(function () {
        Route::get('/', [SalaController::class, 'index'])
            ->name('salas.index');
    });
});
