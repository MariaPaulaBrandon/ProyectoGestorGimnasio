import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Link, Alert, AlertTitle } from '@mui/material';
import Footer from '../layouts/footer/Footer';
import environment from '../../environments/environment';
import './ForgottenPassword.css';

function ForgottenPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('El email es requerido.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('El formato del email no es válido.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      validateEmail();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validateEmail()) {
      return;
    }

    try {
      const response = await fetch(`${environment.apiUrl}/usuarios/check-email/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.message ?? 'Ocurrió un error al intentar enviar el correo de recuperación');
        return;
      }

      if (!data.existe) {
        setSubmitError('El email no está registrado. Por favor, verifica el email ingresado');
        return;
      }

      setSubmitSuccess('Petición de recuperación de contraseña enviada. Por favor, revisá tú correo electrónico para continuar con el proceso');
    } catch (error) {
      setSubmitError(error.message ?? 'Ocurrió un error al intentar enviar el correo de recuperación');
    }
  };

  return (
    <Container component="main" maxWidth={false} className="contenedor-principal">
      <Box className="caja-formulario" sx={{ mt: 8 }}>
        <img src="/logo_app.png" alt={`${environment.nombreApp} Logo`} className="logo" style={{ marginBottom: '16px' }} />
        <Typography component="h1" variant="h5" className="titulo" sx={{ marginBottom: '24px' }}>
          Recuperar Contraseña
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className="formulario" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            error={!!emailError}
            helperText={emailError}
            variant="outlined"
            className="campo-texto"
          />
          {submitError && (
            <Alert severity="error" className="alerta" sx={{ mt: 2 }}>
              <AlertTitle>Error</AlertTitle>
              {submitError}
            </Alert>
          )}
          {submitSuccess && (
            <Alert severity="success" className="alerta" sx={{ mt: 2 }}>
              {submitSuccess}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!email || !!emailError}
            className="boton-enviar"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Enviar Correo de Recuperación
          </Button>
          <Link
            variant="body2"
            onClick={() => navigate('/login')}
            className="enlace-volver-login"
            sx={{ mt: '8px' }}
          >
            Volver al Login
          </Link>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
}

export default ForgottenPassword;
