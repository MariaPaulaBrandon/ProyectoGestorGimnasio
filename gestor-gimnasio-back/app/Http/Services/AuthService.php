<?php

namespace App\Http\Services;

use App\Http\Interfaces\UsuarioRepositoryInterface;
use App\Http\Interfaces\AuthServiceInterface;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class AuthService implements AuthServiceInterface
{
    public function __construct(
        protected UsuarioRepositoryInterface $usuarioRepository
    ) {}

    /**
     * Intenta autenticar un usuario basado en email y contraseña.
     *
     * @param array $credentials Las credenciales (email y password).
     * @return \App\Models\Usuario|null El usuario autenticado o null si falla la autenticación.
     */
    public function attemptLogin(array $credentials): ?Usuario
    {
        $usuario = $this->usuarioRepository->getByEmail($credentials['email']);

        if ($usuario && Hash::check($credentials['password'], $usuario->password)) {
            return $usuario;
        }

        return null;
    }
}
