import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SnackbarMensaje from '../utils/SnackbarMensaje';
import environment from '../../environments/environment';

function ContactoAlumno() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const usuarioEmail = usuario?.email || '';
  const [formulario, setFormulario] = useState({
    asunto: '',
    mensaje: ''
  });
  const [abrirSnackbar, setAbrirSnackbar] = useState(false);
  const [mensajeSnackbar, setMensajeSnackbar] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [enviando, setEnviando] = useState(false);

  const camposCargados = formulario.asunto && formulario.mensaje;
  const deshabilitarBotonEnviar = !camposCargados || enviando;
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
      email: usuarioEmail, // Se envía automáticamente
      asunto: formulario.asunto.trim(),
      mensaje: formulario.mensaje.trim(),
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

      if (!response.ok) {
        const errorData = await response.json();
        showSnackbar(errorData.message || 'Error al enviar el mensaje', 'error');
        setEnviando(false);
        return;
      }

      showSnackbar('Mensaje enviado exitosamente', 'success');
      setFormulario({
        asunto: '',
        mensaje: ''
      });
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
        component={'main'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2 }
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 5 },
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
                mb: { xs: 2, sm: 3, md: 4 },
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'left'
              }}
            >
              Envía tu mensaje
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required label="Asunto"
                type='text'
                value={formulario.asunto}
                onChange={(e) => setFormulario({ ...formulario, asunto: e.target.value })}
                variant="outlined"
                sx={{
                  mb: { xs: 1, sm: 1.5, md: 2 },
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
              <TextField
                fullWidth
                label="Mensaje"
                type='text'
                required
                multiline
                rows={6}
                value={formulario.mensaje}
                onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value })}
                variant="outlined"
                sx={{
                  mb: { xs: 2, sm: 2.5, md: 3 },
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
                  py: { xs: 1.5, sm: 2 },
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 1,
                  mb: { xs: 1.5, sm: 2 },
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
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
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

export default ContactoAlumno;