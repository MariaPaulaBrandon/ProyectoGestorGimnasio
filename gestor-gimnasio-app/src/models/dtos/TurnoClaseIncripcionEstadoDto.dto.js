class TurnoClaseIncripcionEstadoDto {
    constructor(data = {}) {
        this.idTurnoClase = data.idTurnoClase;
        this.idActividad = data.idActividad;
        this.fecha = data.fecha;
        this.horarioDesde = data.horarioDesde;
        this.horarioHasta = data.horarioHasta;
        this.inscripto = data.inscripto;
    }
}

export default TurnoClaseIncripcionEstadoDto;
