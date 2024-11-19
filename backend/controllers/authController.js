  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');

  // Registro
  exports.register = async (req, res) => {
    const { nombre, email, password, role = 'colaborador' } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email ya registrado' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ nombre, email, password: hashedPassword, role });
      await newUser.save();

      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el registro', error });
    }
  };

  // Inicio de sesión
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Asegúrate de retornar el token en la respuesta
      res.json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
  };


  // Obtener datos del usuario autenticado
  exports.getUserProfile = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Obtiene el token del encabezado
      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token
      const user = await User.findById(decoded.id).select('-password'); // Busca el usuario por ID excluyendo la contraseña

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(user); // Retorna los datos del usuario
    } catch (error) {
      res.status(401).json({ message: 'Token no válido o expirado' });
    }
  };

