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
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #ddd",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img src="/logo_app.png" alt="Fit Manager Logo" style={{ height: 50 }} />
          <Typography variant="h4" sx={{ fontWeight: 400, color: "#111" }}>
            Fit Manager
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
          <a href="#caracteristicas" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Características
          </a>
          <a href="#precios" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Precios
          </a>
          <a href="#faq" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
            Preguntas frecuentes
          </a>
          <a href="#contactoLanding" style={{ color: "#111", textDecoration: "none", fontSize: 22 }}>
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
