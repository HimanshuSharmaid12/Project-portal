const roleMiddleware = (roles = []) => {
  // roles can be string or array
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};

module.exports = roleMiddleware;
