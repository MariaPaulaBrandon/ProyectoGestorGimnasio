<?php

namespace App\Http\Repositories;

use App\Http\Interfaces\TurnoClaseRepositoryInterface;
use App\Models\TurnoClase;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TurnoClaseRepository implements TurnoClaseRepositoryInterface
{
    public function getAll(): Collection
    {
        return TurnoClase::with('tipoActividad')
            ->orderBy('id', 'DESC')
            ->get();
    }

    public function getAllWithUserInscriptionStatus(int $userId): Collection
    {
        return TurnoClase::query()
            ->select([
                'turno_clase.id AS idTurnoClase',
                'turno_clase.id_actividad AS idActividad',
                DB::raw('CONCAT(
                    LEFT(tipo_actividad.tipo, 1),
                    SUBSTRING(LOWER(tipo_actividad.tipo), 2)
                ) AS tipoActividad'),
                'turno_clase.fecha',
                'turno_clase.horario_desde AS horarioDesde',
                'turno_clase.horario_hasta AS horarioHasta',
                'turno_clase.cupo_maximo AS cupoMaximo',
                DB::raw('CASE WHEN inscripcion.id IS NOT NULL THEN TRUE ELSE FALSE END AS inscripto')
            ])
            ->leftJoin('tipo_actividad', 'turno_clase.id_actividad', '=', 'tipo_actividad.id')
            ->leftJoin('inscripcion', function ($join) use ($userId) {
                $join->on('turno_clase.id', '=', 'inscripcion.id_turno_clase')
                    ->where('inscripcion.id_usuario', '=', $userId);
            })
            ->orderBy('turno_clase.fecha', 'DESC')
            ->orderBy('turno_clase.id_actividad')
            ->orderBy('turno_clase.horario_desde')
            ->orderBy('turno_clase.horario_hasta')
            ->get();
    }

    public function getCupoMaximoFromTurnoClase(int $idTurnoClase): int
    {
        return TurnoClase::query()
            ->select('cupo_maximo')
            ->where('id', $idTurnoClase)
            ->value('cupo_maximo');
    }

    public function create(array $turnoClase)
    {
        return TurnoClase::create($turnoClase);
    }

    public function update(int $id, array $turnoClase)
    {
        return TurnoClase::where('id', $id)->update($turnoClase);
    }
}
