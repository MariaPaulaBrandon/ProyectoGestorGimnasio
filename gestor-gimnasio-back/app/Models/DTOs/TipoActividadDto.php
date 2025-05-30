<?php

namespace App\Models\DTOs;

class TipoActividadDto
{
    public function __construct(
        public int $id,
        public string $tipo,
        public int $idSala,
        public string $descripcionSala,
    ) {}

    public static function fromTipoActividad($tipoActividad)
    {
        return new self(
            $tipoActividad->id,
            $tipoActividad->tipo,
            $tipoActividad->id_sala,
            $tipoActividad->sala->descripcion,
        );
    }
}
