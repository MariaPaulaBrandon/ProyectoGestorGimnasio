import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  const usuarioEstaLogueado = localStorage.getItem('usuarioAccesToken');

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Rutas protegidas */}

        <Route path='*' element={
          usuarioEstaLogueado
            ? <Navigate to='/register' replace /> //! TODO: Cambiar la ruta al home/dashboard cuando esté disponible
            : <Navigate to='/login' replace />
        } />
      </Routes>
    </Router>
  )
}

export default App
