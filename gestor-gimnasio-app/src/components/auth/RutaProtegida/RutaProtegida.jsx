import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = () => {
    const usuarioEstaLogueado = localStorage.getItem('usuarioAccesToken');

    if (!usuarioEstaLogueado) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default RutaProtegida;
