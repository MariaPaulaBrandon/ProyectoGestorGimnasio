<?php

namespace App\Http\Interfaces;

interface TurnoClaseServiceInterface
{
    /**
     * Obtiene todos los turnos de clase e indica si un usuario específico está inscrito en cada uno.
     *
     * @param int $userId El ID del usuario.
     * @return App\Models\DTOs\TurnoClaseIncriptionStatusDto[]
     */
    public function getAllWithUserInscriptionStatus(int $userId);

    /**
     * Obtiene la cantidad de cupos (capacidad) para un turno de clase específico.
     *
     * @param int $idTurnoClase El ID del turno de clase del cual se quieren obtener los cupos.
     * @return int La cantidad de cupos definidos para el turno de clase.
     */
    public function getCupoMaximoFromTurnoClase(int $idTurnoClase): int;
}
