import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import Dashboard from './pages/Dashboard';
import RegistroBitacoras from './pages/RegistroBitacoras'; // Ajusta la ruta según corresponda
import DetalleBitacora from './pages/DetalleBitacora';
import DetalleCompletoBitacora from './pages/DetalleCompletoBitacora'; // Nueva vista para detalles completos



const App = () => {
  return (
    <Router>
      <nav>
        <div className="logo">Bitácora de Aves</div>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Bienvenido a la Aplicación</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-bitacora" element={<RegistroBitacoras />} />
        <Route path="/bitacoras" element={<DetalleBitacora />} /> {/* Nueva ruta */}
        <Route path="/bitacoras/:id" element={<DetalleCompletoBitacora />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
