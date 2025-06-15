<?php

namespace App\Http\Services;

use App\Http\Interfaces\PagoRepositoryInterface;

class PagoService
{
    protected $pagoRepository;

    public function __construct(PagoRepositoryInterface $pagoRepository)
    {
        $this->pagoRepository = $pagoRepository;
    }

    public function getHistorialByUsuarioId($usuarioId)
    {
        return $this->pagoRepository->getHistorialByUsuarioId($usuarioId);
    }
}