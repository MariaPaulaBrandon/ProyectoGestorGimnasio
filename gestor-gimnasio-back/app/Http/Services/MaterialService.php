<?php

namespace App\Http\Services;

use App\Http\Interfaces\MaterialRepositoryInterface;
use App\Http\Interfaces\MaterialServiceInterface;

class MaterialService implements MaterialServiceInterface
{
    public function __construct(
        private readonly MaterialRepositoryInterface $material_repository,
    ) {}

    /**
     * Obtiene todo el equipamiento del sistema.
     *
     * @return \Illuminate\Database\Eloquent\Collection|array Colección de todos los materiales registrados
     */
    public function getAll()
    {
        return $this->material_repository->getAll();
    }
}
