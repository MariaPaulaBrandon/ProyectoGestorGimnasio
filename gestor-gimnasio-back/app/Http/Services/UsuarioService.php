<?php

namespace App\Http\Services;

use App\Http\Repositories\UsuarioRepository;
use App\Models\DTOs\UsuarioDto; // Asegúrate de importar UsuarioDto
use App\Models\Usuario; // Importa el modelo Usuario

class UsuarioService
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepository $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function getAll()
    {
        $usuarios = $this->usuarioRepository->getAll();
        return $usuarios->map(function (Usuario $usuario) {
            return UsuarioDto::fromUser($usuario);
        });
    }
}
