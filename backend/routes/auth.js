const express = require('express');
const { register, login, getUserProfile } = require('../controllers/authController'); // Controladores
const verifyToken = require('../middlewares/verifyToken'); // Middleware para verificar el token
const verifyRole = require('../middlewares/verifyRole'); // Middleware para roles

const router = express.Router();

// Rutas de autenticación
router.post('/register', verifyToken, verifyRole(['administrador']), register); // Solo administradores pueden registrar usuarios
router.post('/login', login);
router.get('/me', verifyToken, getUserProfile); // Ruta protegida para obtener datos del usuario autenticado

module.exports = router;
