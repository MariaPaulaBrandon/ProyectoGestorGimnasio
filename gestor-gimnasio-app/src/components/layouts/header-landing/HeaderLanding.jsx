import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import "./HeaderLanding.css"

function HeaderLanding() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 4,
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src="/logo_app.png" alt="Fit Manager Logo" style={{ height: 50 }} />
          <Typography variant="h4" sx={{ fontWeight: 400, color: "#111" }}>
            Fit Manager
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="#features" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Características
          </a>
          <a href="#prices" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Precios
          </a>
          <a href="#faq" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Preguntas
          </a>
          <a href="#contact" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Contacto
          </a>
          <Button
            href="/login"
            variant="contained"
            sx={{
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: 2,
              px: 4,
              py: 1,
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "none",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            Ingreso
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default HeaderLanding
