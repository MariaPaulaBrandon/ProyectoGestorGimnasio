import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../layouts/footer/Footer';
import SnackbarMensaje from '../utils/SnackbarMensaje';
import environment from '../../environments/environment';

function Contacto() {
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [enviando, setEnviando] = useState(false);

  const camposCargados = asunto && mensaje;
  const deshabilitarBotonEnviar = !asunto || !mensaje || enviando;
  const navigate = useNavigate();

  const showSnackbar = (mensaje, severidad) => {
    setMensajeSnackbar(mensaje);
    setSnackbarSeverity(severidad);
    setAbrirSnackbar(true);
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAbrirSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!camposCargados) {
      showSnackbar('Por favor, completa todos los campos', 'warning');
      return;
    }

    setEnviando(true);

    const emailJson = JSON.stringify({
      asunto: asunto.trim(),
      mensaje: mensaje.trim(),
    });

    try {
      const response = await fetch(`${environment.apiUrl}/contactos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: emailJson
      });

      if (response.ok) {
        showSnackbar('Mensaje enviado exitosamente', 'success');
        setAsunto('');
        setMensaje('');
      } else {
        const errorData = await response.json();
        showSnackbar(errorData.message || 'Error al enviar el mensaje', 'error');
      }
    } catch (error) {
      showSnackbar(error.message || 'Error de conexión al enviar el mensaje', 'error');
    } finally {
      setEnviando(false);
    }
  };

  const handleVolver = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: 5,
              borderRadius: 2,
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                mb: 4,
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'left'
              }}
            >
              Envía tu mensaje
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  color: '#666666',
                  fontWeight: 500
                }}
              >
              </Typography>
              <TextField
                fullWidth
                required
                label="Asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                variant="outlined"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#cccccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#999999',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  color: '#666666',
                  fontWeight: 500
                }}
              >
              </Typography>
              <TextField
                fullWidth
                label="Mensaje"
                required
                multiline
                rows={8}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                variant="outlined"
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#cccccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#999999',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={deshabilitarBotonEnviar}
                sx={{
                  py: 2,
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 1,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                  '&:disabled': {
                    backgroundColor: '#666666',
                    color: '#ffffff',
                  },
                }}
                startIcon={enviando ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {enviando ? 'Enviando...' : 'Enviar'}
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleVolver}
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 1,
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
              >
                Volver
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
      <SnackbarMensaje
        abrirSnackbar={abrirSnackbar}
        duracionSnackbar={5000}
        handleCloseSnackbar={handleCloseSnackbar}
        mensajeSnackbar={mensajeSnackbar}
        snackbarSeverity={snackbarSeverity}
      />
    </Box>
  );
}

export default Contacto;
