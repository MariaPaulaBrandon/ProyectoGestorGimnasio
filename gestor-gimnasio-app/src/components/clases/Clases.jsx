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

function Clases() {
  const [clasesParaTabla, setClasesParaTabla] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const usuAccesTokenDto = new UsuarioAcceesToken(JSON.parse(localStorage.getItem('usuario')));
      const idUsaurio = usuAccesTokenDto.usuario.id;
      const token = localStorage.getItem('usuarioAccesToken');

      try {
        const response = await fetch(`${environment.apiUrl}/turnos-clase/user-inscription-status/${idUsaurio}`, {
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
        console.error(error.message);
        setClasesParaTabla([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <TableContainer component={Paper} className="clases-table">
      {isLoading ? <ClasesCarga /> : <ClasesTabla clases={clasesParaTabla} />}
    </TableContainer>
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

function ClasesTabla({ clases }) {
  if (!clases || clases.length === 0) {
    return (
      <Table sx={{ minWidth: 900 }} aria-label="tabla de clases">
        <TableHead>
          <TableRow>
            <TableCell>Actividad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Horario Inicio</TableCell>
            <TableCell>Horario Fin</TableCell>
            <TableCell>Inscripto</TableCell>
          </TableRow>
        </TableHead>
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
      <TableHead>
        <TableRow>
          <TableCell>Actividad</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Horario Inicio</TableCell>
          <TableCell>Horario Fin</TableCell>
          <TableCell>Inscripto</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clases.map((clase) => {
          const soloFechas = clase.fecha.split(' ')[0].split('-');
          const fechaFormateada = `${soloFechas[2]}/${soloFechas[1]}/${soloFechas[0]}`;
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

ClasesTabla.propTypes = {
  clases: PropTypes.arrayOf(PropTypes.instanceOf(TurnoClaseIncripcionEstadoDto)).isRequired,
};

export default Clases;
