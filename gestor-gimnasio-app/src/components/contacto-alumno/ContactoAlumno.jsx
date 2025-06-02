import React, { useState } from 'react';
import './ContactoAlumno.css';

function ContactoAlumno() {
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el mensaje
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className="contacto-alumno-container">
      <h2 className="contacto-alumno-title">Envíá tu mensaje</h2>
      <form className="contacto-alumno-form" onSubmit={handleSubmit}>
        <label className="contacto-alumno-label">
          Asunto *
          <input
            type="text"
            className="contacto-alumno-input"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            required
          />
        </label>
        <label className="contacto-alumno-label">
          Mensaje *
          <textarea
            className="contacto-alumno-textarea"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            rows={5}
          />
        </label>
        <button type="submit" className="contacto-alumno-btn">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContactoAlumno;