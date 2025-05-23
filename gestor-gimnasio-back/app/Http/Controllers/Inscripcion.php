<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\InscripcionServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Inscripcion extends Controller
{
    public function __construct(
        private readonly InscripcionServiceInterface $inscripcionService
    ) {}

    public function inscribirUsuario(Request $request)
    {
        $request->validate([
            'id_usuario' => 'required|integer',
            'id_turno_clase' => 'required|integer',
        ]);

        $inscripcion = $this->inscripcionService->inscribirUsuario(
            $request->input('id_usuario'),
            $request->input('id_turno_clase')
        );

        return response()->json($inscripcion, Response::HTTP_CREATED);
    }
}
