<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login']);
Route::prefix('usuarios')->group(function () {
    Route::post('/', [UsuarioController::class, 'store'])->name('usuarios.store');
    Route::get('/check-email/{email}', [UsuarioController::class, 'checkEmailExists'])->name('usuarios.checkEmail');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/', [UsuarioController::class, 'index'])->name('usuarios.index');
        Route::get('/{id}', [UsuarioController::class, 'show'])->name('usuarios.show');
    });
});
