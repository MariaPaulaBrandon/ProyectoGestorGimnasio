import HeaderLanding from "../header-landing/HeaderLanding"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import FooterLanding from "../footer-landing/FooterLanding"
import { Outlet } from "react-router-dom"
import Carousel from "react-material-ui-carousel"

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
      text: "Reportes automáticos y soporte dedicado",
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
