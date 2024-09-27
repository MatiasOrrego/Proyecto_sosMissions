export const authorizeRoles = (req, res, next) => {
  const allowedRoles = [2, 3];
  if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};