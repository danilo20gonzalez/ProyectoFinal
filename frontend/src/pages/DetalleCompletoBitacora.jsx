import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DetalleCompletoBitacora.css'; // Asegúrate de crear estilos apropiados

const DetalleCompletoBitacora = () => {
  const { id } = useParams(); // Obtiene el ID desde la URL
  const [bitacora, setBitacora] = useState(null); // Estado para la bitácora

  useEffect(() => {
    const fetchBitacora = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bitacoras/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBitacora(data); // Guarda los detalles de la bitácora
        } else {
          alert('Error al cargar la bitácora.');
        }
      } catch (error) {
        console.error('Error al cargar la bitácora:', error);
      }
    };

    fetchBitacora();
  }, [id]);

  if (!bitacora) {
    return <p>Cargando detalles de la bitácora...</p>;
  }

  return (
    <div className="detalle-completo-bitacora">
      <h1>{bitacora.titulo}</h1>
      <p><strong>Fecha:</strong> {bitacora.fecha}</p>
      <p><strong>Ubicación:</strong> {bitacora.ubicacion}</p>
      <p><strong>Clima:</strong> {bitacora.clima}</p>
      <p><strong>Hábitat:</strong> {bitacora.descripcion}</p>
      <p><strong>Detalles:</strong> {bitacora.detalles}</p>
      <p><strong>Nombre Científico:</strong> {bitacora.nombreCientifico}</p>
      <p><strong>Nombre Común:</strong> {bitacora.nombreComun}</p>
      <p><strong>Número de Individuos:</strong> {bitacora.numeroIndividuos}</p>
      {bitacora.imageURL && <img src={bitacora.imageURL} alt={bitacora.titulo} style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default DetalleCompletoBitacora;
