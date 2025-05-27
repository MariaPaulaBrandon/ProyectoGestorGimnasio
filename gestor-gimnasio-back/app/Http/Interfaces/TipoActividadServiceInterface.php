<?php

namespace App\Http\Interfaces;

interface TipoActividadServiceInterface
{
    /**
     * Obtener todos los tipos de actividad.
     * @return mixed
     */
    public function getAll();

    /**
     * Crear un nuevo tipo de actividad.
     * @param array $turnoClase
     * @return mixed
     */
    public function create(array $turnoClase);
}
