class TurnoClaseIncripcionEstadoDto {
  constructor(data = {}) {
    this.idTurnoClase = data.idTurnoClase
    this.idActividad = data.idActividad
    this.tipoActividad = data.tipoActividad
    this.idProfesor = data.idProfesor
    this.nombresProfesor = data.nombresProfesor
    this.apellidosProfesor = data.apellidosProfesor
    this.nombreActividad = data.nombreActividad
    this.fecha = data.fecha
    this.horarioDesde = data.horarioDesde
    this.horarioHasta = data.horarioHasta
    this.inscripto = data.inscripto
    this.cupoMaximo = data.cupoMaximo
    this.totalInscriptos = data.totalInscriptos
  }
}

export default TurnoClaseIncripcionEstadoDto
