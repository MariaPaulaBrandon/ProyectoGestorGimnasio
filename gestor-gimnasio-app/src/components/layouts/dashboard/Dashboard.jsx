import Header from "../header/Header";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          mt: 4,
          mb: 4,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 'lg',
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Dashboard;
