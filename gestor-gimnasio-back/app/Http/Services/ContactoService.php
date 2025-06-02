<?php

namespace App\Http\Services;

use App\Http\Interfaces\ContactoServiceInterface;
use App\Http\Interfaces\ContactoRepositoryInterface;
use App\Models\Contacto;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactoService implements ContactoServiceInterface
{
    public function __construct(
        private readonly ContactoRepositoryInterface $contacto_repository,
    ) {}

    /**
     * Crea un nuevo contacto en la base de datos.
     *
     * @param array $data
     * @return Contacto
     */
    public function create(array $data)
    {
        $contacto = $this->contacto_repository->create($data);
        $this->enviarEmailNotificacionAdmin($contacto);
        return $contacto;
    }

    /**
     * Envia un email de notificación al administrador del gimnasio
     *
     * @param Contacto $contacto
     * @return void
     */
    private function enviarEmailNotificacionAdmin(Contacto $contacto)
    {
        try {
            Mail::raw(
                "Nuevo mensaje de contacto:\n" .
                    "De: {$contacto->email}\n" .
                    "Asunto: {$contacto->asunto}\n" .
                    "Mensaje: {$contacto->mensaje}\n" .
                    "Fecha: " . now()->format('d/m/Y H:i:s'),
                function ($message) use ($contacto) {
                    $message->to('admin@fitmanager.com')
                        ->subject($contacto->asunto)
                        ->replyTo($contacto->email);
                }
            );

            Log::info("Email de contacto enviado para contacto ID: {$contacto->id}");
        } catch (\Exception $e) {
            Log::error("Error enviando email de contacto: " . $e->getMessage());
        }
    }
}
