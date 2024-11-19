const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa el middleware CORS
const connectDB = require('./config/db'); // Importa la conexión a MongoDB
const authRoutes = require('./routes/auth');
const bitacoraRoutes = require('./routes/bitacoras');

// Cargar configuración de variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/auth', authRoutes); // Rutas para autenticación
app.use('/bitacoras', bitacoraRoutes); // Rutas para bitácoras

// Middleware global para manejar errores (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Puerto donde se ejecutará el servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
