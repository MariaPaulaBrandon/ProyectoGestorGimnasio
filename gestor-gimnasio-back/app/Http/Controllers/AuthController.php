<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\AuthServiceInterface;
use App\Models\DTOs\UsuarioDto;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function __construct(
        protected AuthServiceInterface $authService
    ) {}

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $usuario = $this->authService->attemptLogin($credentials);

        if ($usuario) {
            return response()->json(UsuarioDto::fromUser($usuario), Response::HTTP_OK);
        } else {
            return response()->json(['message' => 'email o contraseña incorrectos'], Response::HTTP_UNAUTHORIZED);
        }
    }
}
