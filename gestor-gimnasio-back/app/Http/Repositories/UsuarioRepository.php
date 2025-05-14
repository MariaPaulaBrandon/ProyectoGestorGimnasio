<?php

namespace App\Http\Repositories;

use App\Models\Usuario;

class UsuarioRepository
{
    /**
     * Obtener todos los usuarios.
     *
     * @return \Illuminate\Database\Eloquent\Collection Una colección de todos los usuarios.
     */
    public function getAll()
    {
        return Usuario::with('tipoUsuario')
            ->orderBy('id')
            ->get();
    }
}
