<?php

namespace App\Http\Services;

use App\Http\Interfaces\InscripcionRepositoryInterface;
use App\Http\Interfaces\InscripcionServiceInterface;
use App\Models\Inscripcion;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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

    /**
     * Cancela una inscripción específica.
     *
     * @param int $id El ID de la inscripción que se va a cancelar.
     * @return bool Verdadero si la inscripción fue cancelada con éxito, falso en caso contrario.
     */
    public function cancelarInscripcion($id)
    {
        $filasAfectadas = $this->inscripcionRepository->cancelarInscripcion($id);

        if ($filasAfectadas === 0) {
            throw (new ModelNotFoundException)->setModel(Inscripcion::class, [$id]);
        }

        if ($filasAfectadas > 1) {
            throw new \LogicException("Se esperaba eliminar una inscripción, pero se eliminaron {$filasAfectadas}. ID: {$id}");
        }

        return true;
    }
}
