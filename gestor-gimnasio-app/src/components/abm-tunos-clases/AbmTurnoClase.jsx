import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import './AbmTurnoClase.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import environment from "../../environments/environment";
import SnackbarMensaje from "../utils/SnackbarMensaje";
import CargaTabla from "../clases-carga/CargaTabla";

export default function AbmTurnoClase() {
  const userToken = useMemo(() => localStorage.getItem('usuarioAccesToken'), []);

  const [turnoClases, setTurnoClases] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoActividades, setCargandoActividades] = useState(true);
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [modalConfig, setModalConfig] = useState({
    abrir: false,
    esEdicion: false,
    turno: null,
    titulo: '',
  });

  const handleOpenModalCrear = () => {
    setModalConfig({
      abrir: true,
      esEdicion: false,
      turno: null,
      titulo: 'Crear nuevo turno clase',
    });
  };

  const handleOpenModalEditar = (turnoParaEditar) => {
    setModalConfig({
      abrir: true,
      esEdicion: true,
      turno: turnoParaEditar,
      titulo: 'Modificar turno clase',
    });
  };

  const handleCloseModal = () => {
    setModalConfig({
      abrir: false,
      esEdicion: false,
      turno: null,
      titulo: '',
    });
  };

  const handleConfirmarModal = async (datosTurno) => {
    handleCloseModal();
    if (modalConfig.esEdicion) {
      await updateTurnoClase(datosTurno, userToken);
    } else {
      await createTurnoCLase(datosTurno, userToken);
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAbrirSnackbar(false);
  };

  const showSnackbar = useCallback((mensaje, severidad) => {
    setMensajeSnackbar(mensaje);
    setSnackbarSeverity(severidad);
    setAbrirSnackbar(true);
  }, []);

  const getTurnoClases = useCallback(async (token) => {
    setTurnoClases([]);
    setCargando(true);

    try {
      const response = await fetch(`${environment.apiUrl}/turnos-clase`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
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
  }, [showSnackbar]);

  const createTurnoCLase = async (nuevoTurno, token) => {
    setCargando(true);
    try {
      const response = await fetch(`${environment.apiUrl}/turnos-clase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoTurno),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ?? 'Error al crear el turno de clase');
      }

      showSnackbar('Turno de clase creado exitosamente', 'success');
      await getTurnoClases(token);
    } catch (error) {
      showSnackbar(error.message ?? 'Error al crear el turno de clase', 'error');
      setCargando(false);
    }
  }

  const updateTurnoClase = async (turnoActualizado, token) => {
    setCargando(true);
    try {
      const response = await fetch(`${environment.apiUrl}/turnos-clase/${turnoActualizado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(turnoActualizado),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ?? 'Error al modificar el turno de clase');
      }

      showSnackbar('Turno de clase modificado exitosamente', 'success');
      await getTurnoClases(token);
    } catch (error) {
      showSnackbar(error.message ?? 'Error al modificar el turno de clase', 'error');
      setCargando(false);
    }
  };

  const getActividades = useCallback(async (token) => {
    setActividades([]);
    setCargandoActividades(true);

    try {
      const response = await fetch(`${environment.apiUrl}/tipos-actividad`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener las actividades');
      }

      const data = await response.json();
      setActividades(data);
    } catch (error) {
      showSnackbar(error.message ?? 'Error al obtener las actividades', 'error');
      setActividades([]);
    } finally {
      setCargandoActividades(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    getTurnoClases(userToken);
    getActividades(userToken);
  }, [userToken, getTurnoClases, getActividades]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TableContainer component={Paper} className="clases-table">
        {cargando ?
          <CargaTabla texto="Cargando clases..." /> :
          <TurnoClasesTabla
            clases={turnoClases}
            onEditar={handleOpenModalEditar}
          />
        }
      </TableContainer>
      <Box sx={{
        maxWidth: 900,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 2,
      }}>
        <Button variant="outlined" className="boton-principal" disabled={cargandoActividades} onClick={handleOpenModalCrear}>
          Nuevo Turno Clase
        </Button>
        <Button variant="outlined" className="boton-principal" onClick={() => getTurnoClases(userToken)}>
          Actualizar
        </Button>
      </Box>
      <TurnoClaseModal
        abrirModal={modalConfig.abrir}
        handleCerrar={handleCloseModal}
        handleConfirmar={handleConfirmarModal}
        actividades={actividades}
        turnoExistente={modalConfig.turno}
        esEdicion={modalConfig.esEdicion}
        tituloModal={modalConfig.titulo}
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

function TurnoClasesTabla({ clases, onEditar }) {
  const encabezadosTabla = () => {
    return (
      <TableHead className="cabecera-tabla-abm">
        <TableRow>
          <TableCell>ACTIVIDAD</TableCell>
          <TableCell>FECHA</TableCell>
          <TableCell>DESDE</TableCell>
          <TableCell>HASTA</TableCell>
          <TableCell>CUPO MÁXIMO</TableCell>
          <TableCell>ACCIÓN</TableCell>
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
            <TableCell>{clase.tipoActividad.charAt(0).toUpperCase() + clase.tipoActividad.slice(1).toLowerCase()}</TableCell>
            <TableCell>{clase.fecha}</TableCell>
            <TableCell>{clase.horarioDesde}</TableCell>
            <TableCell>{clase.horarioHasta}</TableCell>
            <TableCell>{clase.cupoMaximo}</TableCell>
            <TableCell>
              <Button variant="outlined" className="boton-principal" style={{ minWidth: 200 }} onClick={() => onEditar(clase)}>
                Modificar registro
              </Button>
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
  onEditar: PropTypes.func.isRequired,
}

function TurnoClaseModal({ abrirModal, handleCerrar, handleConfirmar, actividades, turnoExistente, esEdicion, tituloModal }) {
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
  const [idActividad, setIdActividad] = useState('');
  const [fecha, setFecha] = useState(null);
  const [horarioInicio, setHorarioInicio] = useState(null);
  const [horarioFin, setHorarioFin] = useState(null);
  const [cupoMaximo, setCupoMaximo] = useState('');
  const [idTurno, setIdTurno] = useState(null);

  const disabledConfirmButton = !idActividad || !fecha || !horarioInicio || !horarioFin || !cupoMaximo;

  const resetFormValues = () => {
    setIdActividad('');
    setFecha(null);
    setHorarioInicio(null);
    setHorarioFin(null);
    setCupoMaximo('');
    setIdTurno(null);
  }

  const handleSubmit = () => {
    const turnoDatos = {
      id_actividad: idActividad,
      fecha: fecha ? dayjs(fecha).format('YYYY-MM-DD') : null,
      horario_desde: horarioInicio ? dayjs(horarioInicio).format('HH:mm') : null,
      horario_hasta: horarioFin ? dayjs(horarioFin).format('HH:mm') : null,
      cupo_maximo: cupoMaximo ? parseInt(cupoMaximo, 10) : 0,
    };
    if (esEdicion && idTurno) {
      turnoDatos.id = idTurno;
    }
    handleConfirmar(turnoDatos);
  };

  useEffect(() => {
    if (abrirModal && esEdicion && turnoExistente) {
      setIdActividad(turnoExistente.idActividad ?? '');
      setFecha(turnoExistente.fecha ? dayjs(turnoExistente.fecha, 'DD/MM/YYYY') : null);
      setHorarioInicio(turnoExistente.horarioDesde ? dayjs(`2000-01-01T${turnoExistente.horarioDesde}`) : null);
      setHorarioFin(turnoExistente.horarioHasta ? dayjs(`2000-01-01T${turnoExistente.horarioHasta}`) : null);
      setCupoMaximo(turnoExistente.cupoMaximo?.toString() ?? '');
      setIdTurno(turnoExistente.id ?? null);
    } else {
      resetFormValues();
    }
  }, [abrirModal, esEdicion, turnoExistente]);

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
          {tituloModal}
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
                  {actividad.tipo.charAt(0).toUpperCase() + actividad.tipo.slice(1).toLowerCase()}
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
          <Button variant="outlined" className="boton-secundario" onClick={handleCerrar}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={disabledConfirmButton}>Confirmar</Button>
        </Box>
      </Box>
    </Modal>
  );
}

TurnoClaseModal.propTypes = {
  abrirModal: PropTypes.bool.isRequired,
  handleCerrar: PropTypes.func.isRequired,
  handleConfirmar: PropTypes.func.isRequired,
  actividades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      tipo: PropTypes.string.isRequired,
    })
  ).isRequired,
  turnoExistente: PropTypes.shape({
    id: PropTypes.number,
    idActividad: PropTypes.number,
    tipoActividad: PropTypes.string,
    fecha: PropTypes.string,
    horarioDesde: PropTypes.string,
    horarioHasta: PropTypes.string,
    cupoMaximo: PropTypes.number,
  }),
  esEdicion: PropTypes.bool.isRequired,
  tituloModal: PropTypes.string.isRequired,
};
