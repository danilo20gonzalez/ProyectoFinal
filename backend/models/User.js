  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['administrador', 'investigador', 'colaborador'],
      default: 'colaborador',
    },
  });

  module.exports = mongoose.model('User', userSchema);
