<?php

namespace App\Http\Controllers;

use App\Http\Interfaces\ContactoServiceInterface;
use Illuminate\Http\Request;

class ContactoController extends Controller
{
    public function __construct(
        private readonly ContactoServiceInterface $contacto_service,
    ) {}

    /**
     * Crea un nuevo contacto en la base de datos.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            'asunto' => 'required|string|max:255',
            'mensaje' => 'required|string',
        ]);

        $contacto = $this->contacto_service->create($data);

        return response()->json($contacto, 201);
    }
}
