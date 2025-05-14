<?php

namespace App\Models\DTOs;

use App\Models\Usuario;

class UsuarioDto
{
    public function __construct(
        public int $id,
        public string $apellidos,
        public string $nombres,
        public string $email,
        public string $fechaAlta,
        public ?string $fechaBaja,
        public int $idTipoUsuario,
        public string $descTipoUsuario,
    ) {}

    public static function fromUser(Usuario $user)
    {
        return new self(
            $user->id,
            $user->apellidos,
            $user->nombres,
            $user->email,
            $user->fecha_alta,
            $user->fecha_baja,
            $user->id_tipo_usuario,
            $user->tipoUsuario->tipo ?? '',
        );
    }
}
