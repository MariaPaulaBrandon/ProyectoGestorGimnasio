<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TipoUsuarioController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
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

Route::post('auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('usuarios', [UsuarioController::class, 'index']);
    Route::get('usuario/{id}', [UsuarioController::class, 'show']);
    Route::post('usuario', [UsuarioController::class, 'store']);
});

Route::get('tipos-usuario', [TipoUsuarioController::class, 'index']);
