import HeaderLanding from "../header-landing/HeaderLanding"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import FooterLanding from "../footer-landing/FooterLanding"
import { Outlet } from "react-router-dom"
import Carousel from "react-material-ui-carousel"
import Button from "@mui/material/Button"

function Landing() {
  const carouselItems = [
    {
      image: "/hombre_celular.jpg",
      text: "Gestioná tu gimnasio de forma simple y profesional",
    },
    {
      image: "/hombre_celular.jpg",
      text: "Reservá clases y controlá asistencia online",
    },
    {
      image: "/hombre_celular.jpg",
      text: "Reservá clases y controlá asistencia online",
    },
  ]

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <HeaderLanding />
      <Box
        sx={{
          width: "100%",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1900,
            minHeight: 500,
            boxShadow: 2,
            borderRadius: 2,
            overflow: "hidden",
            background: "#fafafa",
          }}
        >
          <Carousel
            indicators={true}
            navButtonsAlwaysVisible={true}
            autoPlay={true}
            interval={5000}
            animation="slide"
            sx={{ height: 500 }}
          >
            {carouselItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  width: "100%",
                  height: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: item.image ? `url(${item.image})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "rgba(255,255,255,0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Box sx={{ fontSize: 26, fontWeight: 500, color: "#111" }}>{item.text}</Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
      <Box
        id="prices"
        sx={{
          width: "100%",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 6,
        }}
      >
        <Box sx={{ fontSize: 32, fontWeight: 500, mb: 2, textAlign: "center" }}>Precios</Box>
        <Box sx={{ fontSize: 18, color: "#444", mb: 4, textAlign: "center" }}>
          Precios expresados en Pesos y sólo válidos para la República Argentina.
        </Box>
        <Box
          sx={{
            background: "#fff",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10), 0 1.5px 3px 0 rgba(0,0,0,0.08)",
            borderRadius: 2,
            maxWidth: 400,
            width: "100%",
            mx: "auto",
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: 28, fontWeight: 400, mb: 1 }}>Estándar</Box>
          <Box sx={{ fontSize: 18, color: "#444", mb: 2 }}>Desde...</Box>
          <Box sx={{ fontSize: 54, fontWeight: 400, mb: 1 }}>$ 30000</Box>
          <Box sx={{ fontSize: 18, color: "#444", mb: 1 }}>por mes*</Box>
          <Box sx={{ fontSize: 18, color: "#444", mb: 2 }}>Incluye:</Box>
          <Box sx={{ fontSize: 17, color: "#222", mb: 1, textAlign: "center" }}>Sistema administrativo Web</Box>
          <Box sx={{ fontSize: 17, color: "#222", mb: 1, textAlign: "center" }}>
            Cantidad ilimitada de usuarios administradores, profesionales, salas
          </Box>
          <Box sx={{ fontSize: 17, color: "#222", mb: 1, textAlign: "center" }}>Posibilidad de varias Sucursales</Box>
          <Box sx={{ fontSize: 17, color: "#222", mb: 3, textAlign: "center" }}>WebApp para los clientes</Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: 2,
              px: 6,
              py: 1.5,
              fontWeight: 500,
              fontSize: 18,
              boxShadow: "none",
              textTransform: "none",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            Contratar
          </Button>
        </Box>
        <Box sx={{ fontSize: 15, color: "#444", mt: 4, textAlign: "center", maxWidth: 600 }}>
          El valor del plan Estándar mínimo es hasta 50 clientes activos.
          <br />
          Consultar por cantidad de clientes activos.
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          mt: 4,
          mb: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "lg",
          }}
        >
          <Outlet />
        </Box>
      </Container>
      <FooterLanding />
    </Box>
  )
}

export default Landing
