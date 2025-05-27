import { Box, CircularProgress, Typography } from "@mui/material";

export default function ClasesCarga() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
      <CircularProgress sx={{ mr: 2 }} />
      <Typography>Cargando clases...</Typography>
    </Box>
  );
}
