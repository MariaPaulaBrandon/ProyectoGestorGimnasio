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
import './Register.css';

function Register() {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleNombresChange = (event) => {
        setNombres(event.target.value);
    };

    const handleApellidosChange = (event) => {
        setApellidos(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Nombres:', nombres);
        console.log('Apellidos:', apellidos);
        console.log('Email:', email.toLocaleUpperCase('es-AR'));
        console.log('Password:', password);
    };

    const handleNavigateToLogin = () => {
        navigate('/login');
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
                                    autoFocus
                                    value={nombres}
                                    onChange={handleNombresChange}
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
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={handleEmailChange}
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
        </Box>
    );
}

export default Register;
