<?php

namespace App\Http\Controllers;

use App\Http\Services\UsuarioService;

class Usuario extends Controller
{
    protected $usuarioSrv;

    public function __construct(UsuarioService $usuarioSrv)
    {
        $this->usuarioSrv = $usuarioSrv;
    }

    public function index()
    {
        $usuarios = $this->usuarioSrv->getAll();
        return response()->json($usuarios);
    }
}
