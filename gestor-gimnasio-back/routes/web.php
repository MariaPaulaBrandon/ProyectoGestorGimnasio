<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactoLandingMail;

Route::post('/contactoLanding', function () {
    $datos = ['nombre' => 'Funny Coder'];
    Mail::to('fitmanagersrl@gmail.com')->send(new ContactoLandingMail($datos['nombre']));
    return 'Mail enviado';
});
