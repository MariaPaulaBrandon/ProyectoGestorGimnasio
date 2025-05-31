import React from 'react';
import './AgendarClases.css';

const clases = [
  {
    id: 1,
    fecha: 'Martes 20, Mayo, 2025 - 8:00hs',
    nombre: 'Funcional',
    sala: 'Sala CrossFit / Funcional',
    profesor: 'Marcos Gómez',
    lugares: 10,
    completo: false,
  },
  {
    id: 2,
    fecha: 'Miércoles 21, Mayo, 2025 - 19:30hs',
    nombre: 'Musculación',
    sala: 'Sala Musculación',
    profesor: 'Sylvester Stallone',
    lugares: 0,
    completo: true,
  },
  {
    id: 3,
    fecha: 'Viernes 23, Mayo, 2025 - 18:30hs',
    nombre: 'CrossFit',
    sala: 'Sala CrossFit / Funcional',
    profesor: 'Marcos Gómez',
    lugares: 5,
    completo: false,
  },
];

function AgendarClases() {
  return (
    <div className="agendar-container">
      <h2 className="agendar-title">Próximas clases</h2>
      <div className="agendar-lista">
        {clases.map(clase => (
          <div
            key={clase.id}
            className={`agendar-clase ${clase.completo ? 'completo' : ''}`}
          >
            <div className="agendar-info">
              <div className="agendar-fecha">
                <b>{clase.fecha} - {clase.nombre}</b>
              </div>
              <div className="agendar-detalle">
                {clase.sala} - Profesor/a: {clase.profesor} - {clase.lugares.toString().padStart(2, '0')} Lugares disponibles
              </div>
            </div>
            <div className="agendar-accion">
              {clase.completo ? (
                <span className="agendar-completo">COMPLETO</span>
              ) : (
                <button className="agendar-btn">INSCRIBIRME</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgendarClases;