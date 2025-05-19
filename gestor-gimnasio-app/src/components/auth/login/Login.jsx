import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import environment from '../../../environments/environment';
import UsuarioAcceesToken from '../../../models/auth/UsuarioAccessToken';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const validatePassword = () => {
    if (!password) {
      setPasswordError('La contraseña es requerida.');
      return false;
    }
    setPasswordError('');
    return true;
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

  const isFormInvalid = () => {
    return !email || !password || !!emailError || !!passwordError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null);

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

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
        navigate('/home');
      } else {
        setLoginError(`Error al iniciar sesión: ${data.message}`);
      }
    } catch (error) {
      setLoginError(`Error ${error}`);
    }
  };

  return (
    <Container component="main" maxWidth="lg" className="login-container-white">
      <Grid container spacing={2} sx={{ minHeight: 'calc(100vh - 128px)', alignItems: 'center' }}>
        <Grid item xs={12} md={6} className="login-info-column">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: { xs: 4, md: 0 } }}>
            <img src="/logo_app.png" alt={`${environment.nombreApp} Logo`} className="login-logo-white" />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
              {environment.nombreApp}
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 2 }}>
              Este es tu canal de gestión de cuenta.
            </Typography>
            <Typography variant="body1" component="div" sx={{ textAlign: 'left' }}>
              Acá vas a poder:
              <ul>
                <li>Actualizar datos personales</li>
                <li>Inscribir a las clases</li>
                <li>Consultar historial de pagos</li>
                <li>Consultar historial de clases</li>
                <li>Cambiar plan</li>
              </ul>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box className="login-box-white">
            <Typography component="h1" variant="h5" className="login-title-white">
              Bienvenido al espacio del cliente
            </Typography>
            {loginError && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {loginError}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column' }} className="login-form-white">
              <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                Email:
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
                className="login-textfield-white"
              />
              <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
                Contraseña:
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={validatePassword}
                error={!!passwordError}
                helperText={passwordError}
                variant="outlined"
                className="login-textfield-white"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          className="register-visibility-icon-white"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-submit-button-white"
                disabled={isFormInvalid()}
                sx={{ mb: '4px !important' }}
              >
                Ingresar
              </Button>
              <Button
                fullWidth
                variant="contained"
                className="login-submit-button-white"
                onClick={() => navigate('/register')}
                sx={{ mt: '4px !important' }}
              >
                Registrarse
              </Button>
              <Link
                href="#"
                variant="body2"
                className="forgot-password-link-white"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <footer className="login-footer-white">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} by {environment.nombreApp}
        </Typography>
      </footer>
    </Container>
  );
}

export default Login;
