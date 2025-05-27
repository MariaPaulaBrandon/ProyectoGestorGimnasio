<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\TipoActividadServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TipoActividadController extends Controller
{
    public function __construct(
        private readonly TipoActividadServiceInterface $tipo_actividad_service
    ) {}

    /**
     * Obtener todos los tipos de actividad.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tiposActividad = $this->tipo_actividad_service->getAll();

        return response()->json($tiposActividad, Response::HTTP_OK);
    }

    /**
     * Crear un nuevo tipo de actividad.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'tipo' => 'required|string|max:255',
            'id_sala' => 'required|numeric',
        ]);

        $tipoActividad = $this->tipo_actividad_service->create($validatedData);

        return response()->json($tipoActividad, Response::HTTP_CREATED);
    }
}
