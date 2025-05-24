import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

function SnackbarMensaje({ abrirSnackbar, duracionSnackbar, handleCloseSnackbar, mensajeSnackbar, snackbarSeverity }) {
  return (
    <Snackbar
      open={abrirSnackbar}
      autoHideDuration={duracionSnackbar}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {mensajeSnackbar}
      </Alert>
    </Snackbar>
  );
}

SnackbarMensaje.propTypes = {
  abrirSnackbar: PropTypes.bool.isRequired,
  duracionSnackbar: PropTypes.number.isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
  mensajeSnackbar: PropTypes.string.isRequired,
  snackbarSeverity: PropTypes.string.isRequired, // 'success', 'error', 'warning', 'info'
}

export default SnackbarMensaje;
