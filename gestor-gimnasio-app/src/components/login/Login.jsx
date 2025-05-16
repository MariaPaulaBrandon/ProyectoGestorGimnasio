import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import UsuarioDto from '../../models/dtos/usuario-dto.model.dto';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const processLoginError = (errorData, type = 'api') => {
    if (type === 'api') {
      setLoginError(`Error: ${errorData.message ?? 'Respuesta inesperada del servidor.'}`);
    } else if (type === 'network') {
      setLoginError(`Error de red: ${errorData.message ?? 'No se pudo conectar al servidor.'}. Por favor, inténtelo más tarde.`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLocaleUpperCase('es-AR'),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const usuario = new UsuarioDto(data);
        //! TODO: Guardar el token en el almacenamiento local o en un contexto global y navegar a la página de inicio
      } else {
        processLoginError(data);
      }
    } catch (error) {
      processLoginError(error, 'network');
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <Box className="login-container">
      <Container component="main" maxWidth="sm">
        <Card className="login-card">
          <CardContent>
            <Box className="login-box-inner">
              <Typography component="h1" variant="h5" className="login-title">
                Inicio de Sesión
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate className="login-form-box">
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
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {loginError && (
                  <Alert severity="error" sx={{ mt: 2, mb: 0 }}>
                    <AlertTitle>Error</AlertTitle>
                    {loginError}
                  </Alert>
                )}
                <Stack spacing={2} className="login-stack">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={handleNavigateToRegister}
                  >
                    Registrarse
                  </Button>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
