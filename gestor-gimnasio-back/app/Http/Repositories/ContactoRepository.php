<?php

namespace App\Http\Repositories;

use App\Http\Interfaces\ContactoRepositoryInterface;
use App\Models\Contacto;

class ContactoRepository implements ContactoRepositoryInterface
{
    /**
     * Crea un nuevo contacto en la base de datos.
     *
     * @param array $data
     * @return Contacto
     */
    public function create(array $data)
    {
        return Contacto::create($data);
    }
}
