<?php

namespace App\Http\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface TurnoClaseRepositoryInterface
{
    /**
     * Obtiene todos los turnos de clase
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAll(): Collection;

    /**
     * Obtiene todos los turnos de clase e indica si un usuario específico está inscrito en cada uno.
     *
     * @param int $userId El ID del usuario.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllWithUserInscriptionStatus(int $userId): Collection;

    /**
     * Obtiene la cantidad de cupos (capacidad) para un turno de clase específico.
     *
     * @param int $idTurnoClase El ID del turno de clase del cual se quieren obtener los cupos.
     * @return int La cantidad de cupos definidos para el turno de clase.
     */
    public function getCupoMaximoFromTurnoClase(int $idTurnoClase): int;

    /**
     * Crea un nuevo turno de clase.
     * @param array $turnoClase Los datos del turno de clase a crear.
     * @return mixed
     */
    public function create(array $turnoClase);
}
