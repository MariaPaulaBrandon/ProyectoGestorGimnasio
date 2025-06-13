<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pago;

class PagoController extends Controller
{
    public function historial(Request $request)
    {
        $userId = $request->user()->id; // Asegúrate de tener autenticación
        $pagos = Pago::where('usuario_id', $userId)->orderBy('fecha', 'desc')->get();
        return response()->json($pagos);
    }
}