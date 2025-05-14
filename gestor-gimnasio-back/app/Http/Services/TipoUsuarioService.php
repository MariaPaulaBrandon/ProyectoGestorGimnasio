<?php

namespace App\Http\Services;

use App\Http\Repositories\TipoUsuarioRepository;

class TipoUsuarioService
{
    protected $tipoUsuarioRepository;

    public function __construct(TipoUsuarioRepository $tipoUsuarioRepository)
    {
        $this->tipoUsuarioRepository = $tipoUsuarioRepository;
    }

    public function getAll()
    {
        return $this->tipoUsuarioRepository->getAll();
    }
}
