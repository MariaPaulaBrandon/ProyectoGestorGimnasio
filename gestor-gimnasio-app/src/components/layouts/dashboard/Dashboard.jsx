import Header from "../header/Header";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Footer from "../footer/Footer";

function Dashboard() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenido a Fit Manager
          </Typography>
          <Typography variant="h6" component="p" align="center" sx={{ mb: 2 }}>
            Gestioná tu gimnasio de forma eficiente.
          </Typography>
          <Box sx={{ textAlign: 'left', maxWidth: '800px', width: '100%' }}>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              <strong>Fit Manager</strong> te ayuda a administrar clases, alumnos y profesores de manera sencilla.
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              Acá vas a poder:
            </Typography>
            <ul>
              <li><Typography variant="body1" component="span">Unirte a clases o darte de baja.</Typography></li>
              <li><Typography variant="body1" component="span">Consultar tu historial de clases.</Typography></li>
              <li><Typography variant="body1" component="span">Administrar clases y alumnos (para personal autorizado).</Typography></li>
            </ul>
            <Typography variant="body1" component="p" align="center" sx={{ mt: 3 }}>
              ¡Empezá a gestionar tu experiencia en el gimnasio!
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
