<?php

namespace App\Http\Interfaces;

interface MaterialServiceInterface
{
    /**
     * Obtiene todo el equipamiento disponible del sistema.
     *
     * @return \Illuminate\Database\Eloquent\Collection|array Colección de todos los materiales registrados
     */
    public function getAll();
}
