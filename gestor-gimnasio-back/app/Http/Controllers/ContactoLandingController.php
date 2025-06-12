<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactoLandingMail;

class ContactoLandingController extends Controller
{
    public function enviar(Request $request)
    {
        $datos = $request->validate([
            'negocio' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'cantidad' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:255',
            'nombre' => 'nullable|string|max:255',
            'mensaje' => 'required|string',
        ]);

        // Enviar mail
        Mail::to('fitmanagersrl@gmail.com')->send(new ContactoLandingMail($datos));

        return response()->json(['message' => 'Consulta enviada correctamente.']);
    }
}
