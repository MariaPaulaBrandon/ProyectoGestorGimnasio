<?php

namespace App\Http\Interfaces;

use App\Models\Contacto;

interface ContactoRepositoryInterface
{
    /**
     * Crea un nuevo contacto en la base de datos.
     *
     * @param array $data
     * @return Contacto
     */
    public function create(array $data);
}
