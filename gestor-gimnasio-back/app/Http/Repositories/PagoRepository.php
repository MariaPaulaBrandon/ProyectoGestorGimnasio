<?php

namespace App\Http\Repositories;

use App\Models\Pago;

class PagoRepository
{
    public function getHistorialByUsuarioId($usuarioId)
    {
        return Pago::where('usuario_id', $usuarioId)
            ->orderBy('fecha', 'desc')
            ->get();
    }
}