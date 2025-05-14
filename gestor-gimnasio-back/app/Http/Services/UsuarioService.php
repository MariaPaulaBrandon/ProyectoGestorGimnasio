<?php

namespace App\Http\Services;

use App\Http\Interfaces\UsuarioRepositoryInterface;
use App\Http\Interfaces\UsuarioServiceInterface;
use App\Models\DTOs\UsuarioDto;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Collection;

class UsuarioService implements UsuarioServiceInterface
{
    public function __construct(
        protected UsuarioRepositoryInterface $usuarioRepoInterface
    ) {}

    public function getAll(): Collection
    {
        $usuarios = $this->usuarioRepoInterface->getAll();
        return $usuarios->map(function (Usuario $usuario) {
            return UsuarioDto::fromUser($usuario);
        });
    }

    public function getById(int $id): ?UsuarioDto
    {
        $usuario = $this->usuarioRepoInterface->getById($id);

        if ($usuario) {
            return UsuarioDto::fromUser($usuario);
        }

        return null;
    }

    public function create(array $data): Usuario
    {
        $data['password'] = Hash::make($data['password']);
        return $this->usuarioRepoInterface->create($data);
    }
}
