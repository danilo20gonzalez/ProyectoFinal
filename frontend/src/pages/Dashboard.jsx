import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importa Link para la navegación interna
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    window.location.href = "/login"; // Redirigir al inicio de sesión
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Debes iniciar sesión");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el encabezado
            },
          }
        );

        setUserName(response.data.nombre); // Cambia según el campo que devuelva el backend
        setError(false); // Reinicia el estado de error si es exitoso
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setError(true);
        localStorage.removeItem("token"); // Limpia el token si es inválido
        setTimeout(() => {
          window.location.href = "/login"; // Redirige después de mostrar el mensaje
        }, 2000); // Da tiempo para que el usuario vea el error
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <header>
        <h2>Bienvenido, {userName || "Usuario"}</h2>
        <button onClick={handleLogout} style={{ float: "right" }}>
          Cerrar Sesión
        </button>
      </header>
      {error ? (
        <p style={{ color: "red" }}>
          Error al cargar los datos del usuario. Redirigiendo al inicio de
          sesión...
        </p>
      ) : (
        <>
          <p>Selecciona una opción para continuar:</p>
          <ul>
            <li>
              <Link to="/bitacoras">Mis Bitácoras</Link> {/* Cambiado a Link */}
            </li>
            <li>
              <Link to="/crear-bitacora">Crear Nueva Bitácora</Link>{" "}
              {/* Cambiado a Link */}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
