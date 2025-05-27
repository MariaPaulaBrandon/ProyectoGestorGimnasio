<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\TurnoClaseServiceInterface;
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
}
