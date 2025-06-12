<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\MaterialServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EquipamientoController extends Controller
{
    public function __construct(
        private readonly MaterialServiceInterface $materialService
    ) {}

    /**
     * Obtener todo el equipamiento disponible.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $equipamiento = $this->materialService->getAll();

        return response()->json($equipamiento);
    }
}
