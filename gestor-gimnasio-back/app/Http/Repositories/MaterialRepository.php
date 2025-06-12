<?php

namespace App\Http\Repositories;

use App\Http\Interfaces\MaterialRepositoryInterface;
use App\Models\Material;

class MaterialRepository implements MaterialRepositoryInterface
{
    /**
     * Obtiene todo el equipamiento disponible del sistema.
     *
     * @return \Illuminate\Database\Eloquent\Collection|array Colección de todos los materiales registrados
     */
    public function getAll()
    {
        return Material::orderBy('id')->get();
    }
}
