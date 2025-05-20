import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import environment from '../../../environments/environment';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        padding: '16px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} by {environment.nombreApp}
      </Typography>
    </Box>
  );
}

export default Footer;
