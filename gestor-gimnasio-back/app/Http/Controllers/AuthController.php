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
            $token = $usuario->createToken('auth_token')->plainTextToken;

            return response()->json([
                'usuario' => UsuarioDto::fromUser($usuario),
                'accessToken' => $token,
                'tokenType' => 'Bearer',
            ], Response::HTTP_OK);
        } else {
            return response()->json(['message' => 'email o contraseña incorrectos'], Response::HTTP_UNAUTHORIZED);
        }
    }
}
