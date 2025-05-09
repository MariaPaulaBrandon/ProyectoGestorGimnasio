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
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email.toLocaleUpperCase('es-AR'));
    console.log('Password:', password);
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
