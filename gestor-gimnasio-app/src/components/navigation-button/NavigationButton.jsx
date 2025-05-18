import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildIcon from '@mui/icons-material/Build';
import TiposUsuarioEnum from '../../models/enums/TiposUsuarioEnum.models.enum.js';
import PropTypes from 'prop-types';

function NavigationButton({ usuario, onClasesClick, onActividadesClick, onAbmClick }) {
  if (!usuario) {
    return null;
  }

  const idTipoUsuario = parseInt(usuario.idTipoUsuario, 10);

  const puedeVerClases =
    idTipoUsuario === TiposUsuarioEnum.ALUMNO ||
    idTipoUsuario === TiposUsuarioEnum.PROFESOR ||
    idTipoUsuario === TiposUsuarioEnum.ADMINISTRADOR;

  const puedeVerActividades =
    idTipoUsuario === TiposUsuarioEnum.PROFESOR ||
    idTipoUsuario === TiposUsuarioEnum.ADMINISTRADOR;

  const puedeVerAbm = idTipoUsuario === TiposUsuarioEnum.ADMINISTRADOR;

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {puedeVerClases && (
        <Button
          color="inherit"
          startIcon={<FitnessCenterIcon />}
          onClick={onClasesClick}
          sx={{ textTransform: 'none', mx: 1 }}
        >
          Clases
        </Button>
      )}
      {puedeVerActividades && (
        <Button
          color="inherit"
          startIcon={<EventNoteIcon />}
          onClick={onActividadesClick}
          sx={{ textTransform: 'none', mx: 1 }}
        >
          Actividades
        </Button>
      )}
      {puedeVerAbm && (
        <Button
          color="inherit"
          startIcon={<BuildIcon />}
          onClick={onAbmClick}
          sx={{ textTransform: 'none', mx: 1 }}
        >
          ABM
        </Button>
      )}
    </Box>
  );
}

NavigationButton.propTypes = {
  usuario: PropTypes.shape({
    idTipoUsuario: PropTypes.oneOf([
      TiposUsuarioEnum.ALUMNO,
      TiposUsuarioEnum.PROFESOR,
      TiposUsuarioEnum.ADMINISTRADOR,
    ]).isRequired,
  }),
  onClasesClick: PropTypes.func.isRequired,
  onActividadesClick: PropTypes.func.isRequired,
  onAbmClick: PropTypes.func.isRequired,
};

export default NavigationButton;
