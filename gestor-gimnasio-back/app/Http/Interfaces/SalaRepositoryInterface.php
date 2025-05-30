<?php

namespace App\Http\Interfaces;

interface SalaRepositoryInterface
{
    /**
     * Obtiene todas las salas disponibles en el sistema.
     *
     * @return \Illuminate\Database\Eloquent\Collection|array Colección de todas las salas registradas
     */
    public function getAll();
}
