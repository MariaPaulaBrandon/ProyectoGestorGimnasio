<?php

namespace App\Http\Services;

use App\Http\Interfaces\InscripcionRepositoryInterface;
use App\Http\Interfaces\InscripcionServiceInterface;

class InscripcionService implements InscripcionServiceInterface
{
    public function __construct(
        private readonly InscripcionRepositoryInterface $inscripcionRepository,
    ) {}

    /**
     * Inscribe un usuario en un turno de clase específico.
     *
     * @param int $id_usuario El ID del usuario que se va a inscribir.
     * @param int $id_turno_clase El ID del turno de clase al que se inscribirá el usuario.
     * @return App\Models\Inscripcion La entidad de inscripción creada.
     */
    public function inscribirUsuario($id_usuario, $id_turno_clase)
    {
        return $this->inscripcionRepository->inscribirUsuario($id_usuario, $id_turno_clase);
    }
}
