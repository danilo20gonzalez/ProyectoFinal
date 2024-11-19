const express = require('express');
const {
  createBitacora,
  getBitacoras,
  deleteBitacora,
  getBitacoraById,
  updateBitacora,
} = require('../controllers/bitacoraController'); // Controladores
const verifyToken = require('../middlewares/verifyToken'); // Middleware para verificar el token
const verifyRole = require('../middlewares/verifyRole'); // Middleware para roles

const router = express.Router();

// Crear una nueva bitácora (investigadores y colaboradores pueden crear si tienen permisos)
router.post('/', verifyToken, verifyRole(['investigador', 'colaborador']), createBitacora);

// Obtener todas las bitácoras (todos los roles pueden ver)
router.get('/', verifyToken, getBitacoras);

// Obtener una bitácora por ID (todos los roles pueden ver)
router.get('/:id', verifyToken, getBitacoraById);

// Actualizar una bitácora (solo investigadores y administradores pueden editar)
router.put('/:id', verifyToken, verifyRole(['investigador', 'administrador']), updateBitacora);

// Eliminar una bitácora (solo administradores pueden eliminar)
router.delete('/:id', verifyToken, verifyRole(['administrador']), deleteBitacora);

module.exports = router;
