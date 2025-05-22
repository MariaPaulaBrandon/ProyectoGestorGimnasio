<?php

namespace App\Http\Services;

use App\Http\Interfaces\TurnoClaseRepositoryInterface;
use App\Http\Interfaces\TurnoClaseServiceInterface;
use App\Models\DTOs\TurnoClaseIncriptionStatusDto;
use App\Models\TurnoClase;

class TurnoClaseService implements TurnoClaseServiceInterface
{
    public function __construct(
        private readonly TurnoClaseRepositoryInterface $turnoClaseRepository
    ) {}

    public function getAllWithUserInscriptionStatus(int $userId)
    {
        $turnos = $this->turnoClaseRepository->getAllWithUserInscriptionStatus($userId);

        return $turnos->map(function ($turno) {
            return new TurnoClaseIncriptionStatusDto(
                idTurnoClase: $turno->idTurnoClase,
                idActividad: $turno->idActividad,
                fecha: $turno->fecha,
                horarioDesde: $turno->horarioDesde,
                horarioHasta: $turno->horarioHasta,
                cupoMaximo: $turno->cupoMaximo,
                inscripto: $turno->inscripto
            );
        });
    }

    public function getCupoMaximoFromTurnoClase(int $idTurnoClase): int
    {
        return $this->turnoClaseRepository->getCupoMaximoFromTurnoClase($idTurnoClase);
    }
}
