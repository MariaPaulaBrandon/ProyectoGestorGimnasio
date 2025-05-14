<?php

namespace App\Http\Interfaces;

use App\Models\Usuario;

interface AuthServiceInterface
{
    /**
     * Intenta autenticar un usuario basado en email y contraseña.
     *
     * @param array $credentials Las credenciales (email y password).
     * @return \App\Models\Usuario|null El usuario autenticado o null si falla la autenticación.
     */
    public function attemptLogin(array $credentials): ?Usuario;
}
