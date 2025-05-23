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
      <Table sx={{ minWidth: 900 }} aria-label="tabla de clases">
        <TableHead>
          <TableRow>
            <TableCell>Actividad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Comienzo</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Inscripto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
                      <CircularProgress sx={{ mr: 2 }} />
                      <Typography>Cargando clases...</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            }
            if (clasesParaTabla && clasesParaTabla.length > 0) {
              return (
                <>
                  {clasesParaTabla.map((clase) => (
                    <TableRow
                      key={clase.idTurnoClase}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{clase.idActividad}</TableCell>
                      <TableCell>{clase.fecha}</TableCell>
                      <TableCell>{clase.horarioDesde}</TableCell>
                      <TableCell>{clase.horarioHasta}</TableCell>
                      <TableCell>{clase.inscripto ? 'Sí' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </>
              );
            }
            return (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay clases para mostrar.
                </TableCell>
              </TableRow>
            );
          })()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Clases;
