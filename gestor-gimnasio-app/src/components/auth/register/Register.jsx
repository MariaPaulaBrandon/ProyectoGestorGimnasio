import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import environment from '../../../environments/environment';
import './Register.css';

function Register() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [nombresError, setNombresError] = useState('');
  const [apellidosError, setApellidosError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const isFormInvalid = () => {
    return !nombres || !apellidos || !email || !password ||
      !!nombresError || !!apellidosError || !!emailError || !!passwordError;
  };

  const validateNombres = () => {
    if (!nombres.trim()) {
      setNombresError('Nombres es requerido.');
      return false;
    }

    setNombresError('');
    return true;
  };

  const validateApellidos = () => {
    if (!apellidos.trim()) {
      setApellidosError('Apellidos es requerido.');
      return false;
    }

    setApellidosError('');
    return true;
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email es requerido.');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Formato de email inválido.');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Contraseña es requerida.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleNombresChange = (event) => {
    setNombres(event.target.value);
    if (nombresError) {
      validateNombres();
    }
  };

  const handleApellidosChange = (event) => {
    setApellidos(event.target.value);
    if (apellidosError) {
      validateApellidos();
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (emailError) {
      validateEmail();
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      validatePassword();
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNombresValid = validateNombres();
    const isApellidosValid = validateApellidos();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isNombresValid || !isApellidosValid || !isEmailValid || !isPasswordValid) {
      handleSnackbar('Formulario inválido. Por favor, corrija los errores.', 'error');
      return;
    }

    try {
      const response = await fetch(`${environment.apiUrl}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nombres: nombres.toLocaleUpperCase('es-AR'),
          apellidos: apellidos.toLocaleUpperCase('es-AR'),
          email: email.toLocaleUpperCase('es-AR'),
          password: password,
        }),
      });

      if (response.ok) {
        handleSnackbar('Registro exitoso. Redirigiendo al inicio de sesión...');
        setTimeout(() => {
          handleNavigateToLogin();
        }, 2000);
      } else {
        const data = await response.json();
        if (data.errors) {
          const mensajesError = validarMensajesErrorRegistro(data.errors);
          handleSnackbar(`Error al registrar el usuario: ${mensajesError}`, 'error');
        } else {
          handleSnackbar(`Error al registrar el usuario: ${data.message}`, 'error');
        }
      }
    } catch (error) {
      handleSnackbar(`Error al registrar el usuario: ${error}`, 'error');
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleSnackbar = (mensaje, severidad = 'success') => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severidad);
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = (_, razon) => {
    if (razon === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const validarMensajesErrorRegistro = (errores) => {
    const erroresEmail = errores.email;
    const erroresPassword = errores.password;

    let mensajesErrorEmail = '';
    let mennsajesErrorPassword = '';

    if (erroresEmail && erroresEmail.length > 0) {
      mensajesErrorEmail = erroresEmail.join(', ');
    }

    if (erroresPassword && erroresPassword.length > 0) {
      mennsajesErrorPassword = erroresPassword.join(', ');
    }

    const mensajesError = `${mensajesErrorEmail} ${mennsajesErrorPassword}`;
    return mensajesError;
  }

  return (
    <Box className="register-container">
      <Container component="main" maxWidth="sm">
        <Card className="register-card">
          <CardContent>
            <Box className="register-box-inner">
              <Typography component="h1" variant="h5" className="register-title">
                Registro
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate className="register-form-box">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nombres"
                  label="Nombres"
                  name="nombres"
                  autoComplete="given-name"
                  value={nombres}
                  onChange={handleNombresChange}
                  onBlur={validateNombres}
                  error={!!nombresError}
                  helperText={nombresError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="apellidos"
                  label="Apellidos"
                  name="apellidos"
                  autoComplete="family-name"
                  value={apellidos}
                  onChange={handleApellidosChange}
                  onBlur={validateApellidos}
                  error={!!apellidosError}
                  helperText={apellidosError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={validatePassword}
                  error={!!passwordError}
                  helperText={passwordError}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="alternar visibilidad de contraseña"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            className="register-visibility-icon"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  }}
                />
                <Stack spacing={2} className="register-stack">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isFormInvalid()}
                  >
                    Registrarse
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    onClick={handleNavigateToLogin}
                  >
                    Iniciar Sesión
                  </Button>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
