const { verifyToken } = require("../config/jwt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", details: err.message });
  }
};

module.exports = authMiddleware;
