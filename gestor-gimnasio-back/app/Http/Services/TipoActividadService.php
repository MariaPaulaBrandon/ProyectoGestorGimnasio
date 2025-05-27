<?php

namespace App\Http\Services;

use App\Http\Interfaces\TipoActividadRepositoryInterface;
use App\Http\Interfaces\TipoActividadServiceInterface;
use App\Models\DTOs\TipoActividadDto;

class TipoActividadService implements TipoActividadServiceInterface
{
    public function __construct(
        private readonly TipoActividadRepositoryInterface $tipo_actividad_repository,
    ) {}

    /**
     * Obtener todos los tipos de actividad.
     *
     * @return mixed
     */
    public function getAll()
    {
        $tipos_actividad = $this->tipo_actividad_repository->getAll();
        return $tipos_actividad->map(function ($tipo_actividad) {
            return TipoActividadDto::fromTipoActividad($tipo_actividad);
        });
    }

    /**
     * Crear un nuevo tipo de actividad.
     *
     * @param array $turnoClase
     * @return mixed
     */
    public function create(array $turnoClase)
    {
        return $this->tipo_actividad_repository->create($turnoClase);
    }
}
