<?php

namespace App\Http\Repositories;

use App\Http\Interfaces\InscripcionRepositoryInterface;
use App\Models\Inscripcion;

class InscripcionRepository implements InscripcionRepositoryInterface
{
    public function inscribirUsuario($id_usuario, $id_turno_clase)
    {
        return Inscripcion::create([
            'id_usuario' => $id_usuario,
            'id_turno_clase' => $id_turno_clase,
            'fecha' => now(),
        ]);
    }

    public function cancelarInscripcion($id)
    {
        return Inscripcion::destroy($id);
    }
}
