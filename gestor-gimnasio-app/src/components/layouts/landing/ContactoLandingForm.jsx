import { useState } from "react"
import { Box, TextField, Button, CircularProgress } from "@mui/material"

const ContactoLandingForm = () => {
  const [formData, setFormData] = useState({
    negocio: "",
    email: "",
    cantidad: "",
    telefono: "",
    nombre: "",
    mensaje: "",
  })
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validarEmail = (email) => {
    return typeof email === "string" && email.includes("@") && email.trim().length > 3
  }

  const validarTelefono = (telefono) => {
    return typeof telefono === "string" && telefono.replace(/\D/g, "").length >= 8
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setEnviado(false)
    setEnviando(true)

    if (!formData.email || !validarEmail(formData.email)) {
      setError("Ingresá un email válido.")
      setEnviando(false)
      return
    }
    if (!formData.nombre || formData.nombre.trim().length === 0) {
      setError("El nombre no puede estar vacío.")
      setEnviando(false)
      return
    }
    if (!formData.negocio || formData.negocio.trim().length === 0) {
      setError("El nombre del negocio no puede estar vacío.")
      setEnviando(false)
      return
    }
    if (!formData.telefono || !validarTelefono(formData.telefono)) {
      setError("El teléfono debe tener al menos 8 números.")
      setEnviando(false)
      return
    }
    if (!formData.mensaje || formData.mensaje.trim().length === 0) {
      setError("El mensaje no puede estar vacío.")
      setEnviando(false)
      return
    }

    try {
      const res = await fetch("http://localhost:8080/api/contactoslanding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setEnviado(true)
        setFormData({
          negocio: "",
          email: "",
          cantidad: "",
          telefono: "",
          nombre: "",
          mensaje: "",
        })
      } else {
        setError("No se pudo enviar el mensaje. Intenta nuevamente.")
      }
    } catch {
      setError("Error de conexión. Intenta nuevamente.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 2 }}
      autoComplete="off"
    >
      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nombre de tu negocio *"
          name="negocio"
          value={formData.negocio}
          onChange={handleChange}
          size="medium"
          InputProps={{ sx: { background: "#fff" } }}
          disabled={enviando}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Email *"
          name="email"
          value={formData.email}
          onChange={handleChange}
          size="medium"
          InputProps={{ sx: { background: "#fff" } }}
          disabled={enviando}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Cantidad promedio de clientes activos"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          size="medium"
          InputProps={{ sx: { background: "#fff" } }}
          disabled={enviando}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Teléfono *"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          size="medium"
          InputProps={{ sx: { background: "#fff" } }}
          disabled={enviando}
        />
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Nombre *"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        size="medium"
        InputProps={{ sx: { background: "#fff" } }}
        disabled={enviando}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribí aquí tu consulta... *"
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        size="medium"
        multiline
        minRows={6}
        InputProps={{ sx: { background: "#fff" } }}
        disabled={enviando}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={enviando}
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
        startIcon={enviando ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {enviando ? "Enviando..." : "Enviar"}
      </Button>
      {enviado && <Box sx={{ color: "green", mt: 2, textAlign: "center" }}>¡Consulta enviada correctamente!</Box>}
      {error && <Box sx={{ color: "red", mt: 2, textAlign: "center" }}>{error}</Box>}
    </Box>
  )
}

export default ContactoLandingForm
