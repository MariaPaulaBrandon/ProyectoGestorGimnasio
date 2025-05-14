<?php

namespace App\Http\Services;

use App\Http\Repositories\UsuarioRepository;
use App\Models\DTOs\UsuarioDto;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash; // Importar Hash

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

    public function getById(int $id)
    {
        $usuario = $this->usuarioRepository->getById($id);

        if ($usuario) {
            return UsuarioDto::fromUser($usuario);
        }

        return null;
    }

    public function create(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return $this->usuarioRepository->create($data);
    }
}
