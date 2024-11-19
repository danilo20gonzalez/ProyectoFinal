const Bitacora = require('../models/Bitacora');

// Crear una nueva bitácora
exports.createBitacora = async (req, res) => {
    const {
        titulo,
        fecha,
        hora,
        ubicacion,
        clima,
        descripcion,
        detalles,
        nombreCientifico,
        nombreComun,
        numeroIndividuos,
        imageURL,
    } = req.body;

    try {
        // Permitir la creación solo si el usuario tiene el rol adecuado
        if (!['investigador', 'colaborador'].includes(req.userRole)) {
            return res.status(403).json({ message: 'No tienes permiso para crear bitácoras.' });
        }

        const nuevaBitacora = new Bitacora({
            titulo,
            fecha,
            hora,
            ubicacion,
            clima,
            descripcion,
            detalles,
            nombreCientifico,
            nombreComun,
            numeroIndividuos,
            imageURL,
        });

        await nuevaBitacora.save();
        res.status(201).json({ message: 'Bitácora registrada con éxito', data: nuevaBitacora });
    } catch (error) {
        console.error('Error al crear la bitácora:', error);
        res.status(500).json({ message: 'Error al crear la bitácora', error });
    }
};

// Obtener todas las bitácoras
exports.getBitacoras = async (req, res) => {
    try {
        const bitacoras = await Bitacora.find();
        res.status(200).json(bitacoras);
    } catch (error) {
        console.error('Error al obtener las bitácoras:', error);
        res.status(500).json({ message: 'Error al obtener las bitácoras', error });
    }
};

// Eliminar una bitácora por ID
exports.deleteBitacora = async (req, res) => {
    const { id } = req.params;

    try {
        const bitacoraEliminada = await Bitacora.findByIdAndDelete(id);
        if (!bitacoraEliminada) {
            return res.status(404).json({ message: 'Bitácora no encontrada' });
        }
        res.status(200).json({ message: 'Bitácora eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la bitácora:', error);
        res.status(500).json({ message: 'Error al eliminar la bitácora' });
    }
};

exports.getBitacoraById = async (req, res) => {
    try {
      const bitacora = await Bitacora.findById(req.params.id);
  
      if (!bitacora) {
        return res.status(404).json({ message: 'Bitácora no encontrada' });
      }
  
      res.status(200).json(bitacora);
    } catch (error) {
      console.error('Error al obtener la bitácora:', error);
      res.status(500).json({ message: 'Error al obtener la bitácora', error });
    }
  };

  
  exports.updateBitacora = async (req, res) => {
    try {
      const updatedBitacora = await Bitacora.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!updatedBitacora) {
        return res.status(404).json({ message: 'Bitácora no encontrada' });
      }
  
      res.status(200).json({ message: 'Bitácora actualizada con éxito', data: updatedBitacora });
    } catch (error) {
      console.error('Error al actualizar la bitácora:', error);
      res.status(500).json({ message: 'Error al actualizar la bitácora', error });
    }
  };
  