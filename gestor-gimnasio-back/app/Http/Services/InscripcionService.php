<?php

namespace App\Http\Services;

use App\Http\Interfaces\InscripcionRepositoryInterface;
use App\Http\Interfaces\InscripcionServiceInterface;
use App\Http\Interfaces\TurnoClaseRepositoryInterface;
use App\Models\Inscripcion;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;

class InscripcionService implements InscripcionServiceInterface
{
    public function __construct(
        private readonly InscripcionRepositoryInterface $inscripcionRepository,
        private readonly TurnoClaseRepositoryInterface $turnoClaseRepository,
    ) {}

    /**
     * Inscribe un usuario en un turno de clase específico.
     *
     * @param int $id_usuario El ID del usuario que se va a inscribir.
     * @param int $id_turno_clase El ID del turno de clase al que se inscribirá el usuario.
     * @return App\Models\Inscripcion La entidad de inscripción creada.
     *
     * @throws CupoActualClaseException Si no hay cupos disponibles para el turno de clase.
     * @throws ModelNotFoundException Si el turno de clase no existe.
     */
    public function inscribirUsuario($id_usuario, $id_turno_clase)
    {
        $cupoActualClase = $this->turnoClaseRepository->getCupoActual($id_turno_clase);

        if ($cupoActualClase <= 0) {
            throw new CupoActualClaseException();
        }

        return $this->inscripcionRepository->inscribirUsuario($id_usuario, $id_turno_clase);
    }

    /**
     * Cancela una inscripción específica.
     *
     * @param int $id_usuario El ID del usuario que va a cancelar la inscripción.
     * @param int $id_turno_clase El ID del turno de clase al que cancelará la inscripción el usuario.
     * @return int El número de registros eliminados.
     */
    public function cancelarInscripcion($id_usuario, $id_turno_clase)
    {
        $filasAfectadas = $this->inscripcionRepository->cancelarInscripcion($id_usuario, $id_turno_clase);

        if ($filasAfectadas === 0) {
            throw (new ModelNotFoundException)->setModel(Inscripcion::class, [$id_usuario, $id_turno_clase]);
        }

        if ($filasAfectadas > 1) {
            throw new \LogicException("Se esperaba eliminar una inscripción, pero se eliminaron {$filasAfectadas}");
        }

        return $filasAfectadas;
    }
}

class CupoActualClaseException extends \Exception
{
    public function __construct($message = "No hay disponibilidad para la clase seleccionada", $code = Response::HTTP_BAD_REQUEST)
    {
        parent::__construct($message, $code);
    }
}
