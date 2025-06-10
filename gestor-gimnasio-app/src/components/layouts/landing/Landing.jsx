import HeaderLanding from "../header-landing/HeaderLanding"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import FooterLanding from "../footer-landing/FooterLanding"
import { Outlet } from "react-router-dom"
import Carousel from "react-material-ui-carousel"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import React from "react"

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

  const faqData = [
    {
      question: "¿El programa requiere instalación?",
      answer:
        "No. Es una plataforma 100% online. Solo necesitás un navegador y conexión a internet para acceder desde cualquier dispositivo (PC, tablet o celular).",
    },
    {
      question: "¿Quiénes pueden acceder al sistema?",
      answer:
        "El sistema tiene tres tipos de usuarios: administradores, profesores y alumnos. Cada uno ve únicamente las funciones relacionadas con su rol.",
    },
    {
      question: "¿Cómo se anotan los alumnos a las clases?",
      answer:
        "Desde su perfil, el alumno puede ver el cronograma de actividades y reservar lugar según disponibilidad. También puede cancelar o reprogramar turnos.",
    },
    {
      question: "¿Cómo se reciben las notificaciones?",
      answer: "Las notificaciones se reciben por email y pueden verse en el panel del sistema.",
    },
    {
      question: "¿Qué pasa si se pierde internet en el gimnasio?",
      answer:
        "Como es un sistema en la nube, podés acceder desde cualquier lugar. Si se corta internet en el gimnasio, el administrador puede ingresar desde otro dispositivo conectado.",
    },
    {
      question: "¿El sistema guarda un historial de asistencia y pagos?",
      answer: "Sí, el sistema almacena el historial de asistencia y pagos de cada cliente.",
    },
  ]
  const [openFaq, setOpenFaq] = React.useState(null)

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
            sx={{ height: 700 }}
          >
            {carouselItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  width: "100%",
                  height: 700,
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
                    background: "rgba(46, 46, 46, 0.45)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        fontSize: 26,
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {item.text}
                    </Box>
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
        <Box
          sx={{
            fontSize: 32,
            fontWeight: 500,
            mb: 2,
            textAlign: "center",
          }}
        >
          Precios
        </Box>
        <Box
          sx={{
            fontSize: 18,
            color: "#444",
            mb: 4,
            textAlign: "center",
          }}
        >
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
          <Box
            sx={{
              fontSize: 17,
              color: "#222",
              mb: 1,
              textAlign: "center",
            }}
          >
            Sistema Administrativo Web
          </Box>
          <Box
            sx={{
              fontSize: 17,
              color: "#222",
              mb: 1,
              textAlign: "center",
            }}
          >
            Cantidad ilimitada de usuarios administradores, profesionales, salas
          </Box>
          <Box
            sx={{
              fontSize: 17,
              color: "#222",
              mb: 1,
              textAlign: "center",
            }}
          >
            Posibilidad de varias Sucursales
          </Box>
          <Box
            sx={{
              fontSize: 17,
              color: "#222",
              mb: 3,
              textAlign: "center",
            }}
          >
            WebApp para los clientes
          </Box>
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
        <Box
          sx={{
            fontSize: 15,
            color: "#444",
            mt: 4,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          El valor del plan Estándar mínimo es hasta 50 clientes activos.
          <br />
          Consultar por cantidad de clientes activos.
        </Box>
      </Box>
      <Box
        id="faq"
        sx={{
          width: "100%",
          background: "#fafafa",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          py: 8,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            width: "100%",
            maxWidth: 1200,
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box sx={{ flex: 2, minWidth: 320 }}>
            <Box
              sx={{
                fontSize: 32,
                fontWeight: 500,
                mb: 1,
                textAlign: "center",
              }}
            >
              Preguntas y respuestas FAQ
            </Box>
            <Box
              sx={{
                fontSize: 18,
                color: "#444",
                mb: 4,
                textAlign: "center",
              }}
            >
              En esta sección se responden algunas preguntas frecuentes.
              <br />
              Para resolver cualquier consulta o duda lo mejor es concretar una reunión presencial o por
              videoconferencia.
            </Box>
            <Box>
              {faqData.map((item, idx) => (
                <Box key={idx}>
                  <Box
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 1,
                      mb: openFaq === idx ? 0 : 1.5,
                      background: "#fff",
                      px: 2.5,
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 18,
                      fontWeight: 400,
                      cursor: "pointer",
                      transition: "border-radius 0.2s",
                      borderBottomLeftRadius: openFaq === idx ? 0 : 4,
                      borderBottomRightRadius: openFaq === idx ? 0 : 4,
                      boxShadow: openFaq === idx ? "0 2px 8px 0 rgba(0,0,0,0.04)" : "none",
                    }}
                  >
                    {item.question}
                    <Box
                      sx={{
                        fontSize: 28,
                        color: "#888",
                        ml: 2,
                        lineHeight: 1,
                        transform: openFaq === idx ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      +
                    </Box>
                  </Box>
                  {openFaq === idx && (
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderTop: "none",
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        background: "#fff",
                        px: 2.5,
                        py: 1.5,
                        fontSize: 17,
                        color: "#222",
                        mb: 1.5,
                        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                        animation: "fadeInFaq 0.2s",
                      }}
                    >
                      {item.answer}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 300,
              background: "#fff",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
              borderRadius: 2,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 350,
            }}
          >
            <Box
              sx={{
                fontSize: 24,
                fontWeight: 500,
                mb: 1,
                textAlign: "center",
              }}
            >
              ¿Tenés más dudas?
            </Box>
            <Box
              sx={{
                fontSize: 16,
                color: "#444",
                mb: 3,
                textAlign: "center",
              }}
            >
              Escribí una consulta y tendrás una respuesta a la brevedad
            </Box>
            <Button
              href="/#contactoExterno"
              variant="contained"
              sx={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",
                width: "100%",
                mb: 2,
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              Contacto
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",
                width: "100%",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              <Box component="span" sx={{ fontSize: 22, mr: 1 }}>
                <i className="fab fa-facebook" />
              </Box>
              Facebook
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              <Box component="span" sx={{ fontSize: 22, mr: 1 }}>
                <i className="fab fa-instagram" />
              </Box>
              Instagram
            </Button>
          </Box>
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
      <Box
        id="contactoExterno"
        sx={{
          width: "100%",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            background: "#fff",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: { xs: 2, sm: 6 },
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: 32, fontWeight: 500, mb: 2, textAlign: "center" }}>Consultar o Contratar</Box>
          <Box sx={{ fontSize: 18, color: "#444", mb: 4, textAlign: "center", maxWidth: 800 }}>
            ¿Tenés un gimnasio? Si querés contratar el servicio del sistema de gestión Fit Manager,
            <br />
            por favor completá el formulario y nos comunicaremos a la brevedad.
          </Box>
          <Box
            component="form"
            sx={{ width: "100%", maxWidth: 700, display: "flex", flexDirection: "column", gap: 2 }}
            autoComplete="off"
          >
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nombre de tu negocio"
                size="medium"
                InputProps={{ sx: { background: "#fff" } }}
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Email"
                size="medium"
                InputProps={{ sx: { background: "#fff" } }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Cantidad promedio de clientes activos"
                size="medium"
                InputProps={{ sx: { background: "#fff" } }}
              />
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Teléfono"
                size="medium"
                InputProps={{ sx: { background: "#fff" } }}
              />
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nombre"
              size="medium"
              InputProps={{ sx: { background: "#fff" } }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribí aquí tu consulta..."
              size="medium"
              multiline
              minRows={6}
              InputProps={{ sx: { background: "#fff" } }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                fontSize: 18,
                boxShadow: "none",
                textTransform: "none",
                width: "100%",
                mt: 2,
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
      <FooterLanding />
    </Box>
  )
}

export default Landing
