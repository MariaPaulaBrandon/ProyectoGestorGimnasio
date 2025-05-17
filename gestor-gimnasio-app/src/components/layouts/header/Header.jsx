import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import UsuarioDto from '../../../models/dtos/UsuarioDto.model.dto';
import './Header.css';

function Header() {
  const [anchorMenuUsu, setAnchorMenuUsu] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioParseado = JSON.parse(usuarioGuardado);
      setUsuario(new UsuarioDto(usuarioParseado));
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorMenuUsu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenuUsu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioAccesToken');
    localStorage.removeItem('usuarioTokenType');
    setUsuario(null);
    handleClose();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fit Manager
          </Typography>
          {usuario && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorMenuUsu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorMenuUsu)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Typography variant="subtitle1">{`${usuario.nombres} ${usuario.apellidos}`}</Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="subtitle1">{`Rol: ${usuario.descTipoUsuario}`}</Typography>
                </MenuItem>
                <MenuItem
                  sx={{
                    justifyContent: 'center',
                    paddingY: '6px',
                    '&:hover, &.Mui-focusVisible': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    className="logout-button-custom-red"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
