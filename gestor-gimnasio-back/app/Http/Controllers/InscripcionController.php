<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\InscripcionServiceInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InscripcionController extends Controller
{
    public function __construct(
        private readonly InscripcionServiceInterface $inscripcionService
    ) {}

    public function inscribirUsuario(Request $request)
    {
        $request->validate([
            'idUsuario' => 'required|integer',
            'idTurnoClase' => 'required|integer',
        ]);

        $inscripcion = $this->inscripcionService->inscribirUsuario(
            $request->input('idUsuario'),
            $request->input('idTurnoClase')
        );

        return response()->json($inscripcion, Response::HTTP_CREATED);
    }

    public function cancelarInscripcion($id)
    {
        try {
            $this->inscripcionService->cancelarInscripcion($id);
            return response()->json(null, Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Inscripción no encontrada'], Response::HTTP_NOT_FOUND);
        } catch (\LogicException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
