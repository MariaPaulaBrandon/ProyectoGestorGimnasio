<?php

namespace App\Http\Repositories;

use App\Http\Interfaces\TipoActividadRepositoryInterface;
use App\Models\TipoActividad;

class TipoActividadRepository implements TipoActividadRepositoryInterface
{
    /**
     * Obtener todos los tipos de actividad.
     *
     * @return mixed
     */
    public function getAll()
    {
        return TipoActividad::all();
    }

    /**
     * Crear un nuevo tipo de actividad.
     *
     * @param array $turnoClase
     * @return mixed
     */
    public function create(array $turnoClase)
    {
        return TipoActividad::create($turnoClase);
    }
}
