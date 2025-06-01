import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from '../layouts/footer/Footer';

function Contacto() {
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const deshabilitarBotonEnviar = !asunto || !mensaje;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
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
                }}
              >
                Enviar
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
    </Box>
  );
}

export default Contacto;
