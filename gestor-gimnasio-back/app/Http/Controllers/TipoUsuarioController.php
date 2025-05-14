<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\TipoUsuarioService;

class TipoUsuarioController extends Controller
{
    protected $tipoUsuarioSrv;

    public function __construct(TipoUsuarioService $tipoUsuarioSrv)
    {
        $this->tipoUsuarioSrv = $tipoUsuarioSrv;
    }

    public function index()
    {
        $tiposUsuario = $this->tipoUsuarioSrv->getAll();
        return response()->json($tiposUsuario);
    }
}
