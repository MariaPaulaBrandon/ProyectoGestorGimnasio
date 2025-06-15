<!-- namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pago;

class PagoController extends Controller
{
    public function historial(Request $request)
    {
        $userId = $request->user()->id;
        $pagos = Pago::where('usuario_id', $userId)->orderBy('fecha', 'desc')->get();
        return response()->json($pagos);
    }
}  -->

<?php
use App\Http\Interfaces\PagoServiceInterface;

class PagoController extends Controller
{
    protected $pagoService;

    public function __construct(PagoServiceInterface $pagoService)
    {
        $this->pagoService = $pagoService;
    }

    public function historial(Request $request)
    {
        $userId = $request->user()->id;
        $pagos = $this->pagoService->getHistorialByUsuarioId($userId);
        return response()->json($pagos);
    }
}