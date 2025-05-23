<?php

namespace App\Http\Interfaces;

interface InscripcionServiceInterface
{
    /**
     * Inscribe un usuario en un turno de clase específico.
     *
     * @param int $id_usuario El ID del usuario que se va a inscribir.
     * @param int $id_turno_clase El ID del turno de clase al que se inscribirá el usuario.
     * @return App\Models\Inscripcion La entidad de inscripción creada.
     */
    public function inscribirUsuario($id_usuario, $id_turno_clase);

    /**
     * Cancela una inscripción específica.
     *
     * @param int $id El ID de la inscripción que se va a cancelar.
     * @return bool Verdadero si la inscripción fue cancelada con éxito, falso en caso contrario.
     */
    public function cancelarInscripcion($id);
}
