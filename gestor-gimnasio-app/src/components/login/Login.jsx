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
import './Login.css';
import environment from '../../environments/Environment';
import UsuarioAcceesToken from '../../models/auth/UsuarioAccessToken';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch(`${environment.apiUrl}/auth/login`, {
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
        const usuAccesToken = new UsuarioAcceesToken(data.usuario, data.accessToken, data.tokenType);
        localStorage.setItem('usuario', JSON.stringify(usuAccesToken.usuario));
        localStorage.setItem('usuarioAccesToken', usuAccesToken.accessToken);
        localStorage.setItem('usuarioTokenType', usuAccesToken.tokenType);
      } else {
        setLoginError(`Error al iniciar sesión: ${data.message}`);
      }
    } catch (error) {
      setLoginError(`Error ${error}`);
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
