<?php

namespace App\Http\Services;

use App\Http\Interfaces\ContactoServiceInterface;
use App\Http\Interfaces\ContactoRepositoryInterface;
use App\Models\Contacto;

class ContactoService implements ContactoServiceInterface
{
    public function __construct(
        private readonly ContactoRepositoryInterface $contacto_repository,
    ) {}

    /**
     * Crea un nuevo contacto en la base de datos.
     *
     * @param array $data
     * @return Contacto
     */
    public function create(array $data)
    {
        return $this->contacto_repository->create($data);
    }
}
