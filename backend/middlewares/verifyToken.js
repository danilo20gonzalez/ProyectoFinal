const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  // Obtener el token del encabezado "Authorization"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No se proporcionó un token o formato incorrecto' });
  }

  // Extraer el token (sin el prefijo "Bearer ")
  const token = authHeader.split(' ')[1];

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Almacenar el ID del usuario en el objeto `req`

    // Obtener el usuario desde la base de datos para verificar su existencia y rol
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Adjuntar el rol y otros datos necesarios al objeto de solicitud
    req.userRole = user.role;

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
