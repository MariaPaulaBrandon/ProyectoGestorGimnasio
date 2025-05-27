import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SnackbarMensaje from "../components/utils/SnackbarMensaje";
import { useEffect, useState } from "react";
import ClasesCarga from "../components/clases-carga/ClasesCarga";
import PropTypes from "prop-types";
import environment from "../environments/environment";
import './AbmTurnoClase.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export default function AbmTurnoClase() {
  const userToken = localStorage.getItem('usuarioAccesToken');

  const [turnoClases, setTurnoClases] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [abrirModalCrear, setAbrirModalCrear] = useState(false);
  const [actividadesDisponibles, setActividadesDisponibles] = useState([]);

  useEffect(() => {
    getTurnoClases(userToken);
    setActividadesDisponibles([
      { id: 1, tipoActividad: 'BOXEO' },
      { id: 2, tipoActividad: 'NATACION' },
      { id: 3, tipoActividad: 'PILATES' },
      { id: 4, tipoActividad: 'ZUMBA' },
    ]);
  }, [userToken]);

  const handleOpenModalCrear = () => setAbrirModalCrear(true);
  const handleCloseModalCrear = () => setAbrirModalCrear(false);
  const handleCrearTurnoClase = async (nuevoTurno) => {
    //! TODO: Implementar la lógica para crear un nuevo turno de clase
    handleCloseModalCrear();
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAbrirSnackbar(false);
  };

  const showSnackbar = (mensaje, severidad) => {
    setMensajeSnackbar(mensaje);
    setSnackbarSeverity(severidad);
    setAbrirSnackbar(true);
  };

  const getTurnoClases = async (tokenParam) => {
    setTurnoClases([]);
    setCargando(true);

    try {
      const response = await fetch(`${environment.apiUrl}/turnos-clase`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenParam}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los turnos de clases');
      }

      const data = await response.json();
      setTurnoClases(data);
    } catch (error) {
      showSnackbar(error.message ?? 'Error al obtener los turnos de clases', 'error');
      setTurnoClases([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TableContainer component={Paper} className="clases-table">
        {cargando ?
          <ClasesCarga /> :
          <TurnoClasesTabla
            clases={turnoClases}
          />
        }
      </TableContainer>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" onClick={handleOpenModalCrear}>
          Nuevo Turno Clase
        </Button>
        <Button variant="outlined" sx={{ ml: 2 }} onClick={() => getTurnoClases(userToken)}>
          Actualizar
        </Button>
      </Box>
      <CrearTurnoClaseModal
        abrirModal={abrirModalCrear}
        handleCerrar={handleCloseModalCrear}
        handleConfirmar={handleCrearTurnoClase}
        actividades={actividadesDisponibles}
      />
      <SnackbarMensaje
        abrirSnackbar={abrirSnackbar}
        duracionSnackbar={5000}
        handleCloseSnackbar={handleCloseSnackbar}
        mensajeSnackbar={mensajeSnackbar}
        snackbarSeverity={snackbarSeverity}
      />
    </LocalizationProvider>
  );
}

function TurnoClasesTabla({ clases }) {
  const encabezadosTabla = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Actividad</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Horario Inicio</TableCell>
          <TableCell>Horario Fin</TableCell>
          <TableCell>Cupo Máximo</TableCell>
          <TableCell>Acción</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  if (!clases || clases.length === 0) {
    return (
      <Table sx={{ minWidth: 900 }} aria-label="tabla de abm turno clases">
        {encabezadosTabla()}
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} align="center">
              No hay turnos de clases para mostrar
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table sx={{ minWidth: 900 }} aria-label="tabla de abm turno clases">
      {encabezadosTabla()}
      <TableBody>
        {clases.map((clase) => (
          <TableRow key={clase.id}>
            <TableCell>{clase.tipoActividad}</TableCell>
            <TableCell>{clase.fecha}</TableCell>
            <TableCell>{clase.horarioDesde}</TableCell>
            <TableCell>{clase.horarioHasta}</TableCell>
            <TableCell>{clase.cupoMaximo}</TableCell>
            <TableCell>
              Acciones
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TurnoClasesTabla.propTypes = {
  clases: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      idActividad: PropTypes.number.isRequired,
      tipoActividad: PropTypes.string.isRequired,
      fecha: PropTypes.string.isRequired,
      horarioDesde: PropTypes.string.isRequired,
      horarioHasta: PropTypes.string.isRequired,
      cupoMaximo: PropTypes.number.isRequired,
    })
  ).isRequired,
}

function CrearTurnoClaseModal({ abrirModal, handleCerrar, handleConfirmar, actividades }) {
  const [idActividad, setIdActividad] = useState('');
  const [fecha, setFecha] = useState(null);
  const [horarioInicio, setHorarioInicio] = useState(null);
  const [horarioFin, setHorarioFin] = useState(null);
  const [cupoMaximo, setCupoMaximo] = useState('');
  const disabledConfirmButton = !idActividad || !fecha || !horarioInicio || !horarioFin || !cupoMaximo;

  const resetFormValues = () => {
    setIdActividad('');
    setFecha(null);
    setHorarioInicio(null);
    setHorarioFin(null);
    setCupoMaximo('');
  }

  const handleSubmit = () => {
    const nuevoTurno = {
      idActividad,
      fecha: fecha ? dayjs(fecha).format('DD/MM/YYYY') : null,
      horarioInicio: horarioInicio ? dayjs(horarioInicio).format('HH:mm') : null,
      horarioFin: horarioFin ? dayjs(horarioFin).format('HH:mm') : null,
      cupoMaximo: cupoMaximo ? parseInt(cupoMaximo, 10) : 0,
    };
    handleConfirmar(nuevoTurno);
  };

  useEffect(() => {
    if (!abrirModal) {
      resetFormValues();
    }
  }, [abrirModal]);

  const handleCupoMaximoChange = (event) => {
    event.preventDefault();
    const value = event.target.value;

    if (value === "") {
      setCupoMaximo("");
      return;
    }

    const regexSoloDigitos = /^\d+$/;
    if (!regexSoloDigitos.test(value)) {
      return;
    }

    setCupoMaximo(value.slice(0, 3));
  }

  return (
    <Modal
      open={abrirModal}
      onClose={handleCerrar}
      aria-labelledby="modal-crear-turno-clase-title"
      aria-describedby="modal-crear-turno-clase-description"
    >
      <Box sx={styleModal}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, color: 'black', textAlign: 'center' }}>
          Crear nuevo turno clase
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="actividad-select-label">Actividad</InputLabel>
          <Select
            labelId="actividad-select-label"
            id="actividad-select"
            value={idActividad}
            label="Actividad"
            onChange={(e) => setIdActividad(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccione una Actividad</em>
            </MenuItem>
            {actividades.map((actividad) => {
              return (
                <MenuItem key={actividad.id} value={actividad.id}>
                  {actividad.tipoActividad}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <DatePicker
          label="Fecha"
          value={fecha}
          onChange={(nuevaFecha) => setFecha(nuevaFecha)}
          format="DD/MM/YYYY"
          sx={{ width: '100%', mt: 1, mb: 1 }}
          slotProps={{ textField: { margin: 'normal', fullWidth: true } }}
        />

        <TimePicker
          label="Horario Inicio"
          value={horarioInicio}
          onChange={(nuevoHorario) => setHorarioInicio(nuevoHorario)}
          format="HH:mm"
          sx={{ width: '100%', mt: 1, mb: 1 }}
          slotProps={{ textField: { margin: 'normal', fullWidth: true } }}
        />

        <TimePicker
          label="Horario Fin"
          value={horarioFin}
          onChange={(nuevoHorario) => setHorarioFin(nuevoHorario)}
          format="HH:mm"
          sx={{ width: '100%', mt: 1, mb: 1 }}
          slotProps={{ textField: { margin: 'normal', fullWidth: true } }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Cupo Máximo"
          type="text"
          value={cupoMaximo}
          onChange={handleCupoMaximoChange}
          slotProps={{
            htmlInput: {
              minLength: 1,
              maxLength: 3,
            }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
          <Button variant="outlined" onClick={handleCerrar}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={disabledConfirmButton}>Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

CrearTurnoClaseModal.propTypes = {
  abrirModal: PropTypes.bool.isRequired,
  handleCerrar: PropTypes.func.isRequired,
  handleConfirmar: PropTypes.func.isRequired,
  actividades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      tipoActividad: PropTypes.string.isRequired,
    })
  ).isRequired,
};
