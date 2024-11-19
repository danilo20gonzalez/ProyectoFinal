import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import "../styles/DetalleBitacora.css";

const DetalleBitacora = () => {
  const [bitacoras, setBitacoras] = useState([]); // Estado para las bitácoras
  const [filteredBitacoras, setFilteredBitacoras] = useState([]); // Estado de bitácoras filtradas
  const [searchTitle, setSearchTitle] = useState(""); // Estado para el filtro
  const [userRole, setUserRole] = useState(""); // Estado para el rol del usuario

  useEffect(() => {
    const fetchBitacoras = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Debes iniciar sesión");
          window.location.href = "/login";
          return;
        }

        // Obtener las bitácoras
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bitacoras`, {
          headers: {
            Authorization: `Bearer ${token}`, // Token en encabezados
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBitacoras(data);
          setFilteredBitacoras(data);
        } else {
          alert("Error al obtener las bitácoras.");
        }

        // Obtener el rol del usuario
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // Token en encabezados
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserRole(userData.role); // Almacenar el rol del usuario
        } else {
          alert("Error al obtener los datos del usuario.");
        }
      } catch (error) {
        console.error("Error al cargar las bitácoras o el rol:", error);
        alert("Hubo un error al cargar los datos.");
      }
    };

    fetchBitacoras();
  }, []);

  // Manejar el filtro por título
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTitle(value);

    const filtered = bitacoras.filter((bitacora) =>
      bitacora.titulo.toLowerCase().includes(value)
    );
    setFilteredBitacoras(filtered);
  };

  // Función para eliminar una bitácora
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta bitácora?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bitacoras/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Token en encabezados
        },
      });

      if (response.ok) {
        alert("Bitácora eliminada con éxito.");
        setBitacoras(bitacoras.filter((bitacora) => bitacora._id !== id)); // Actualizar la lista de bitácoras
        setFilteredBitacoras(filteredBitacoras.filter((bitacora) => bitacora._id !== id)); // Actualizar la lista filtrada
      } else {
        alert("Error al eliminar la bitácora.");
      }
    } catch (error) {
      console.error("Error al eliminar la bitácora:", error);
      alert("Hubo un error al eliminar la bitácora.");
    }
  };

  return (
    <div className="detalle-bitacora">
      <div className="background-image"></div>
      <div className="contenido">
        <h1>Mis Bitácoras</h1>

        {/* Barra de búsqueda */}
        <div className="filtro">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTitle}
            onChange={handleSearchChange}
          />
        </div>

        {/* Lista de bitácoras filtradas */}
        {filteredBitacoras.length > 0 ? (
          filteredBitacoras.map((bitacora, index) => (
            <div key={index} className="bitacora-detalle">
              <h2>
                <Link to={`/bitacoras/${bitacora._id}`}>{bitacora.titulo}</Link>
              </h2>
              <p>
                <strong>Fecha:</strong> {bitacora.fecha}
              </p>
              <p>
                <strong>Ubicación:</strong> {bitacora.ubicacion}
              </p>
              <p>
                <strong>Clima:</strong> {bitacora.clima}
              </p>
              <p>
                <strong>Hábitat:</strong> {bitacora.descripcion}
              </p>
              <section className="acciones">
                {/* Botón de Editar */}
                {(userRole === "investigador" || userRole === "administrador") && (
                  <button className="btn-editar" onClick={() => window.location.href = `/editar-bitacora/${bitacora._id}`}>
                    Editar
                  </button>
                )}

                {/* Botón de Eliminar */}
                {userRole === "administrador" && (
                  <button className="btn-eliminar" onClick={() => handleDelete(bitacora._id)}>
                    Eliminar
                  </button>
                )}
              </section>
            </div>
          ))
        ) : (
          <p>No se encontraron bitácoras con ese título.</p>
        )}
      </div>
    </div>
  );
};

export default DetalleBitacora;
