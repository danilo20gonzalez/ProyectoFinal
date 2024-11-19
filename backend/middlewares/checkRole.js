const checkRole = (role) => {
    return (req, res, next) => {
      if (req.userRole !== role) {
        return res.status(403).json({ message: 'Acceso denegado: permiso insuficiente' });
      }
      next();
    };
  };
  
  module.exports = checkRole;
  