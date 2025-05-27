<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\TurnoClaseServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TurnoClase extends Controller
{
    public function __construct(
        private readonly TurnoClaseServiceInterface $turnoClaseService
    ) {}

    public function getAll()
    {
        $turnos = $this->turnoClaseService->getAll();
        return response()->json($turnos, Response::HTTP_OK);
    }

    public function getAllWithUserInscriptionStatus(int $userId)
    {
        $turnos = $this->turnoClaseService->getAllWithUserInscriptionStatus($userId);
        return response()->json($turnos, Response::HTTP_OK);
    }

    public function getCupoMaximoFromTurnoClase(int $idTurnoClase)
    {
        $cupoMaximo = $this->turnoClaseService->getCupoMaximoFromTurnoClase($idTurnoClase);
        return response($cupoMaximo, Response::HTTP_OK)
            ->header('Content-Type', 'application/json');
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'id_actividad' => 'required|numeric',
            'fecha' => 'required|date',
            'horario_desde' => 'required|date_format:H:i',
            'horario_hasta' => 'required|date_format:H:i|after:horarioDesde',
            'cupo_maximo' => 'required|numeric|min:1',
        ]);

        $turnoClase = $this->turnoClaseService->create($validatedData);
        return response()->json($turnoClase, Response::HTTP_CREATED);
    }
}
