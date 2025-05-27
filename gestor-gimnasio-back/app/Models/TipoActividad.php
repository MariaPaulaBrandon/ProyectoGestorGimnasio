<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoActividad extends Model
{
    use HasFactory;

    protected $table = 'tipo_actividad';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'id_sala',
    ];

    protected $casts = [
        'tipo' => 'string',
        'id_sala' => 'integer',
    ];
}
