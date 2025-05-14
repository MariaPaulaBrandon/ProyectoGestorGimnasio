<?php

namespace App\Http\Services;

use App\Http\Repositories\UsuarioRepository;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepository $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    /**
     * Intenta autenticar un usuario basado en email y contraseña.
     *
     * @param array $credentials Las credenciales (email y password).
     * @return \App\Models\Usuario|null El usuario autenticado o null si falla la autenticación.
     */
    public function attemptLogin(array $credentials)
    {
        $usuario = $this->usuarioRepository->getByEmail($credentials['email']);

        if ($usuario && Hash::check($credentials['password'], $usuario->password)) {
            return $usuario;
        }

        return null;
    }
}
