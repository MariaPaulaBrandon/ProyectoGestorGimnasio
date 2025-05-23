<?php

namespace App\Models\DTOs;

class TurnoClaseIncriptionStatusDto
{
    public function __construct(
        public int $idTurnoClase,
        public int $idActividad,
        public string $tipoActividad,
        public string $fecha,
        public string $horarioDesde,
        public string $horarioHasta,
        public int $cupoMaximo,
        public bool $inscripto
    ) {}
}
