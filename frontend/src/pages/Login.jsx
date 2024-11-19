import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook de React Router para redirigir

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );
      // Revisa si response.data.token contiene el token JWT
      console.log('Token recibido:', response.data.token);
  
      localStorage.setItem("token", response.data.token); // Almacena el token en localStorage
      alert("Inicio de sesión exitoso");
      window.location.href = "/dashboard"; // Redirige al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(
        "Error al iniciar sesión: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
