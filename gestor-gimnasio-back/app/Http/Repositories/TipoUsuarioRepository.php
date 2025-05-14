<?php

namespace App\Http\Repositories;

use App\Models\TipoUsuario;

class TipoUsuarioRepository
{
    public function getAll()
    {
        return TipoUsuario::all();
    }
}
