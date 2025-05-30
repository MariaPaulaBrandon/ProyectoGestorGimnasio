<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\SalaServiceInterface;
use Illuminate\Http\Request;

class SalaController extends Controller
{
    public function __construct(
        private readonly SalaServiceInterface $salaService
    ) {}

    /**
     * Obtener todas las salas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $salas = $this->salaService->getAll();

        return response()->json($salas);
    }
}
