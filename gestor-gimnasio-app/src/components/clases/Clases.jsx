import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import TurnoClaseIncripcionEstadoDto from '../../models/dtos/TurnoClaseIncripcionEstadoDto.dto';
import environment from '../../environments/environment';
import './Clases.css';
import UsuarioAcceesToken from '../../models/auth/UsuarioAccessToken';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { green, red } from '@mui/material/colors';
import { Button } from '@mui/material';
import SnackbarMensaje from '../utils/SnackbarMensaje';

function Clases() {
  const [clasesParaTabla, setClasesParaTabla] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accionEnProgreso, setAccionEnProgreso] = useState(false);
  const [accionId, setAccionId] = useState(null);
  const usuario = new UsuarioAcceesToken(JSON.parse(localStorage.getItem('usuario'))).usuario;
  const token = localStorage.getItem('usuarioAccesToken');

  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleCloseSnackbar = (event, reason) => {
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

  useEffect(() => {
    getClaesIncripcionUsuario(usuario, token);
  }, []);

  const handleInscribirClick = async (idTurnoClase) => {
    setAccionEnProgreso(true);
    setAccionId(idTurnoClase);

    try {
      const response = await fetch(`${environment.apiUrl}/inscripciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          idUsuario: usuario.id,
          idTurnoClase,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido al inscribirse' }));
        throw new Error(errorData.message || 'Error al inscribirse a la clase');
      }

      showSnackbar('Inscripción realizada con éxito', 'success');
      await getClaesIncripcionUsuario(usuario, token);
    } catch (error) {
      showSnackbar(error.message || 'Error al inscribirse a la clase', 'error');
    } finally {
      setAccionEnProgreso(false);
      setAccionId(null);
    }
  };

  const handleCancelarInscripcionClick = async (idTurnoClase) => {
    setAccionEnProgreso(true);
    setAccionId(idTurnoClase);

    try {
      const response = await fetch(`${environment.apiUrl}/inscripciones/${usuario.id}/${idTurnoClase}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido al cancelar la inscripción' }));
        throw new Error(errorData.message || 'Error al cancelar la inscripción');
      }

      showSnackbar('Inscripción cancelada con éxito', 'success');
      await getClaesIncripcionUsuario(usuario, token);
    } catch (error) {
      showSnackbar(error.message || 'Error al cancelar la inscripción', 'error');
    } finally {
      setAccionEnProgreso(false);
      setAccionId(null);
    }
  };

  const getClaesIncripcionUsuario = async (usuario, token) => {
    setClasesParaTabla([]);
    setIsLoading(true);
    const idUsuario = usuario.id;

    try {
      const response = await fetch(`${environment.apiUrl}/turnos-clase/user-inscription-status/${idUsuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos de las clases');
      }

      const data = await response.json();
      const dataDto = data.map(item => new TurnoClaseIncripcionEstadoDto(item));
      setClasesParaTabla(dataDto);
    } catch (error) {
      showSnackbar(error.message || 'Error al tratar de obtener las clases', 'error');
      setClasesParaTabla([]);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <>
      <TableContainer component={Paper} className="clases-table">
        {isLoading ?
          <ClasesCarga /> :
          <ClasesTabla
            clases={clasesParaTabla}
            onInscribirClick={handleInscribirClick}
            onCancelarInscripcionClick={handleCancelarInscripcionClick}
            accionEnProgreso={accionEnProgreso}
            accionId={accionId}
          />
        }
      </TableContainer>
      <SnackbarMensaje
        abrirSnackbar={abrirSnackbar}
        duracionSnackbar={5000}
        handleCloseSnackbar={handleCloseSnackbar}
        mensajeSnackbar={mensajeSnackbar}
        snackbarSeverity={snackbarSeverity}
      />
    </>
  );
}

function ClasesCarga() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <CircularProgress sx={{ mr: 2 }} />
      <Typography>Cargando clases...</Typography>
    </Box>
  );
}

function ClasesTabla({ clases, onInscribirClick, onCancelarInscripcionClick, accionEnProgreso, accionId }) {
  const encabezadoTabla = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Actividad</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Horario Inicio</TableCell>
          <TableCell>Horario Fin</TableCell>
          <TableCell>Inscripto</TableCell>
          <TableCell>Acción</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  if (!clases || clases.length === 0) {
    return (
      <Table sx={{ minWidth: 900 }} aria-label="tabla de clases">
        {encabezadoTabla()}
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} align="center">
              No hay clases para mostrar
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table sx={{ minWidth: 600 }} aria-label="tabla de clases">
      {encabezadoTabla()}
      <TableBody>
        {clases.map((clase) => {
          const soloFechas = clase.fecha.split(' ')[0].split('-');
          const fechaFormateada = `${soloFechas[2]}/${soloFechas[1]}/${soloFechas[0]}`;
          const isCurrentActionTarget = accionEnProgreso && accionId === clase.idTurnoClase;
          return (
            <TableRow
              key={clase.idTurnoClase}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{clase.tipoActividad}</TableCell>
              <TableCell>{fechaFormateada}</TableCell>
              <TableCell>{clase.horarioDesde}</TableCell>
              <TableCell>{clase.horarioHasta}</TableCell>
              <TableCell>
                {clase.inscripto ?
                  <CheckCircleOutlineIcon sx={{ color: green[500] }} /> :
                  <HighlightOffIcon sx={{ color: red[500] }} />}
              </TableCell>
              <TableCell>
                {clase.inscripto ? (
                  <Button
                    variant="outlined"
                    onClick={() => onCancelarInscripcionClick(clase.idTurnoClase)}
                    disabled={accionEnProgreso}
                  >
                    {isCurrentActionTarget ? <CircularProgress size={24} color="inherit" /> : 'Cancelar Inscripción'}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => onInscribirClick(clase.idTurnoClase)}
                    disabled={accionEnProgreso}
                  >
                    {isCurrentActionTarget ? <CircularProgress size={24} color="inherit" /> : 'Inscribirse'}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

ClasesTabla.propTypes = {
  clases: PropTypes.arrayOf(PropTypes.instanceOf(TurnoClaseIncripcionEstadoDto)).isRequired,
  onInscribirClick: PropTypes.func.isRequired,
  onCancelarInscripcionClick: PropTypes.func.isRequired,
  accionEnProgreso: PropTypes.bool.isRequired,
  accionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Clases;
