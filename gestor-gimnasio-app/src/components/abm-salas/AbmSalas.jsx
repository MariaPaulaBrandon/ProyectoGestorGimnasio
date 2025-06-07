import { useMemo, useCallback, useEffect, useState } from "react"
import environment from "../../environments/environment"
import ClasesCarga from "../clases-carga/ClasesCarga"

import SnackbarMensaje from "../utils/SnackbarMensaje"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export default function AbmSalas() {
  const userToken = useMemo(() => localStorage.getItem("usuarioAccesToken"), [])
  const [salas, setSalas] = useState([])
  const [cargando, setCargando] = useState(true)

  const [abrirSnackbar, setAbrirSnackbar] = useState(false)
  const [mensajeSnackbar, setMensajeSnackbar] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("info")

  const showSnackbar = useCallback((mensaje, severidad) => {
    setMensajeSnackbar(mensaje)
    setSnackbarSeverity(severidad)
    setAbrirSnackbar(true)
  }, [])

  const getSalas = useCallback(
    async (token) => {
      setSalas([])
      setCargando(true)

      try {
        const response = await fetch(`${environment.apiUrl}/salas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Error al obtener las salas")
        }

        const data = await response.json()
        setSalas(data)
      } catch (error) {
        showSnackbar(error.message ?? "Error al obtener las salas", "error")
        setSalas([])
      } finally {
        setCargando(false)
      }
    },
    [showSnackbar]
  )

  useEffect(() => {
    getSalas(userToken)
  }, [userToken, getSalas])

  console.log("Salas:", salas)

  return (
    <TableContainer component={Paper} className="salas-table">
      {cargando ? <ClasesCarga /> : <SalasTabla salas={salas} />}
    </TableContainer>
  )
}

function SalasTabla({ salas, onEditar }) {
  const encabezadosTabla = () => {
    return (
      <TableHead className="cabecera-tabla-abm">
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>SALA</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  if (!salas || salas.length === 0) {
    return (
      <Table sx={{ minWidth: 600 }} aria-label="tabla de abm salas">
        {encabezadosTabla()}
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} align="center">
              No hay salas para mostrar
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table sx={{ minWidth: 600 }} aria-label="tabla de abm salas">
      {encabezadosTabla()}
      <TableBody>
        {salas.map((sala) => (
          <TableRow key={sala.id}>
            <TableCell>{sala.id}</TableCell>
            <TableCell>{sala.descripcion.charAt(0).toUpperCase() + sala.descripcion.slice(1).toLowerCase()}</TableCell>
            {/*  <TableCell>
              <Button variant="outlined" className="boton-principal" onClick={() => onEditar(actividad)}>
                Modificar registro
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
