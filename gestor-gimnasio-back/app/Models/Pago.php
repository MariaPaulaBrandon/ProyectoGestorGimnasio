<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'pago'; // Nombre exacto de la tabla
    // Puedes agregar fillable si lo necesitas

    protected $primaryKey = 'id';
    public $timestamps = false; // Si no usas created_at y updated_at
}