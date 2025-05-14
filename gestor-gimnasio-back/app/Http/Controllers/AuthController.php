<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthService;
use App\Models\DTOs\UsuarioDto;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = $this->authService->attemptLogin($credentials);

        if ($usuario) {
            return response()->json(UsuarioDto::fromUser($usuario));
        } else {
            return response()->json(['message' => 'Email o contraseña incorrectos.'], 401);
        }
    }
}
