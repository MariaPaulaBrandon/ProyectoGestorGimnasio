<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    // Enviar mensaje
    public function enviar(Request $request)
    {
        $mensaje = Mensaje::create([
            'remitente_id' => $request->remitente_id,
            'destinatario_id' => $request->destinatario_id,
            'asunto' => $request->asunto,
            'mensaje' => $request->mensaje,
        ]);
        return response()->json(['ok' => true, 'mensaje' => $mensaje]);
    }

    // Listar recibidos
    public function recibidos($usuarioId)
    {
        $mensajes = Mensaje::where('destinatario_id', $usuarioId)
            ->orderBy('fecha_envio', 'desc')
            ->get();
        return response()->json($mensajes);
    }

    // Listar enviados
    public function enviados($usuarioId)
    {
        $mensajes = Mensaje::where('remitente_id', $usuarioId)
            ->orderBy('fecha_envio', 'desc')
            ->get();
        return response()->json($mensajes);
    }

    public function marcarLeido($id)
    {
        $mensaje = Mensaje::findOrFail($id);
        $mensaje->leido = true;
        $mensaje->save();
        return response()->json(['ok' => true]);
    }

    public function eliminar($id)
    {
        $mensaje = Mensaje::findOrFail($id);
        $mensaje->delete();
        return response()->json(['ok' => true]);
    }
}
