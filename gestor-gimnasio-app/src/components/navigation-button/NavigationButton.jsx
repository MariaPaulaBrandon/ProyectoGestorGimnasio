import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildIcon from '@mui/icons-material/Build';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TiposUsuarioEnum from '../../models/enums/TiposUsuarioEnum.models.enum.js';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavigationButton({ usuario }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleAbmClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAbmClose = () => {
    setAnchorEl(null);
  };

  const handleAbmClasesClick = () => {
    navigate('/dashboard/abm/clases');
    handleAbmClose();
  };

  const handleAbmTiposActividadClick = () => {
    navigate('/dashboard/abm/tipos-actividad');
    handleAbmClose();
  };
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {puedeVerClases && (
        <Button
          color="inherit"
          startIcon={<FitnessCenterIcon />}
          sx={{ textTransform: 'none', mx: 1 }}
          onClick={() => navigate('/dashboard/clases')}
        >
          Clases
        </Button>
      )}
      {puedeVerActividades && (
        <Button
          color="inherit"
          startIcon={<EventNoteIcon />}
          sx={{ textTransform: 'none', mx: 1 }}
        >
          Actividades
        </Button>
      )}
      {puedeVerAbm && (
        <>
          <Button
            color="inherit"
            startIcon={<BuildIcon />}
            endIcon={<ArrowDropDownIcon />}
            sx={{ textTransform: 'none', mx: 1 }}
            onClick={handleAbmClick}
            aria-controls="abm-menu"
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
          >
            ABM
          </Button>
          <Menu
            id="abm-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAbmClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleAbmClasesClick}>
              ABM Clases
            </MenuItem>
            <MenuItem onClick={handleAbmTiposActividadClick}>
              ABM Tipos de Actividad
            </MenuItem>
          </Menu>
        </>
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
};

export default NavigationButton;
