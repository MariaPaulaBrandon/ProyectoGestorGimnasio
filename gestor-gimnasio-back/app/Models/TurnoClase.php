<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnoClase extends Model
{
    use HasFactory;

    protected $table = 'turno_clase';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'id_actividad',
        'fecha',
        'horario_desde',
        'horario_hasta',
        'cupo_maximo',
    ];

    protected $casts = [
        'id_actividad' => 'integer',
        'fecha' => 'date',
        'horario_desde' => 'datetime:H:i',
        'horario_hasta' => 'datetime:H:i',
        'cupo_maximo' => 'integer',
    ];

    public function tipoActividad()
    {
        return $this->belongsTo(TipoActividad::class, 'id_actividad', 'id');
    }
}
