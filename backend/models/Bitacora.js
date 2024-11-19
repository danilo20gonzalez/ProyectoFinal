const mongoose = require('mongoose');

const bitacoraSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    ubicacion: { type: String, required: true },
    clima: { type: String, required: true },
    descripcion: { type: String, required: true },
    detalles: { type: String, required: true },
    nombreCientifico: { type: String, required: true },
    nombreComun: { type: String, required: true },
    numeroIndividuos: { type: Number, required: true },
    imageURL: { type: String, required: true }, // URL de la imagen
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bitacora', bitacoraSchema);
