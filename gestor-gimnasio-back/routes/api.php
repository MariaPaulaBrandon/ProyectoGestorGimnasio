<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/prueba', function () {
    return response()->json([
        'message' => 'Hello, this is a test response!'
    ]);
})->name('prueba');
