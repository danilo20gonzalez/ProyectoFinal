const verifyRole = (requiredRoles) => {
    return (req, res, next) => {
      const { userRole } = req; // `userRole` debe estar disponible desde `verifyToken`
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
      next();
    };
  };
  
  module.exports = verifyRole;
  