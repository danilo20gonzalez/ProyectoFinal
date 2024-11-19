import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../firebaseConfig.js'; // Importa la configuración de Firebase
import '../styles/RegistroBitacoras.css'; // Estilos del formulario

const RegistroBitacoras = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    clima: '',
    descripcion: '',
    detalles: '',
    nombreCientifico: '',
    nombreComun: '',
    numeroIndividuos: '',
  });
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState('');

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el archivo seleccionado para la imagen
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Subir imagen a Firebase Storage
  const uploadImage = () => {
    if (!image) {
      alert('Por favor selecciona una imagen.');
      return;
    }

    const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
        alert('Imagen subida con éxito.');
      }
    );
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageURL) {
      alert('Por favor sube una imagen antes de registrar.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Obtiene el token del localStorage
      if (!token) {
        alert('No has iniciado sesión. Por favor inicia sesión.');
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/bitacoras`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Agrega el token al encabezado
        },
        body: JSON.stringify({ ...formData, imageURL }), // Incluye los datos del formulario y la imagen
      });

      if (response.ok) {
        alert('Bitácora registrada con éxito.');
        setFormData({
          titulo: '',
          fecha: '',
          hora: '',
          ubicacion: '',
          clima: '',
          descripcion: '',
          detalles: '',
          nombreCientifico: '',
          nombreComun: '',
          numeroIndividuos: '',
        });
        setImage(null);
        setProgress(0);
        setImageURL('');
      } else {
        const errorData = await response.json();
        alert(`Error al registrar la bitácora: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al registrar la bitácora:', error);
      alert('Error al registrar la bitácora.');
    }
  };

  return (
    <div className="registro-bitacoras">
      <div className="form-container">
        <h1>Registro de Bitácoras</h1>
        <form onSubmit={handleSubmit}>
          {/* Campo Título */}
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={formData.titulo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Fecha */}
          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Hora */}
          <div className="form-group">
            <label>Hora:</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Ubicación */}
          <div className="form-group">
            <label>Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              placeholder="Ubicación"
              value={formData.ubicacion}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Clima */}
          <div className="form-group">
            <label>Clima:</label>
            <input
              type="text"
              name="clima"
              placeholder="Clima"
              value={formData.clima}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Descripción */}
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              placeholder="Descripción del hábitat"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Campo Detalles */}
          <div className="form-group">
            <label>Detalles:</label>
            <textarea
              name="detalles"
              placeholder="Detalles de las aves observadas"
              value={formData.detalles}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          {/* Campo Nombre Científico */}
          <div className="form-group">
            <label>Nombre Científico:</label>
            <input
              type="text"
              name="nombreCientifico"
              placeholder="Nombre Científico"
              value={formData.nombreCientifico}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Nombre Común */}
          <div className="form-group">
            <label>Nombre Común:</label>
            <input
              type="text"
              name="nombreComun"
              placeholder="Nombre Común"
              value={formData.nombreComun}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Número de Individuos */}
          <div className="form-group">
            <label>Número de Individuos:</label>
            <input
              type="number"
              name="numeroIndividuos"
              placeholder="Número de individuos"
              value={formData.numeroIndividuos}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Subir Fotografía */}
          <div className="form-group">
            <label>Subir Fotografía:</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
            />
            <button type="button" onClick={uploadImage}>
              Subir Imagen
            </button>
          </div>

          {progress > 0 && <p>Progreso: {progress}%</p>}
          {imageURL && <img src={imageURL} alt="Imagen subida" style={{ maxWidth: '100%' }} />}

          {/* Botón para enviar el formulario */}
          <button type="submit" className="btn-submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroBitacoras;
