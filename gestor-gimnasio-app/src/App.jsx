import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './components/login/Login';
import Register from './components/register/Register';
import Header from './components/layouts/header/Header';

function App() {
  const usuarioEstaLogueado = localStorage.getItem('usuarioAccesToken');

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Rutas protegidas */}
        <Route path='/header' element={<Header />} />

        <Route path='*' element={
          usuarioEstaLogueado
            ? <Navigate to='/header' replace />
            : <Navigate to='/login' replace />
        } />
      </Routes>
    </Router>
  )
}

export default App
