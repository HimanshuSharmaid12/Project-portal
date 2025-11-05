const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signToken } = require("../config/jwt");

/**
 * Register: name, email, password, role
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, role: role || "candidate", passwordHash: hash });

    const token = signToken({ id: user._id, role: user.role });

    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, skills: user.skills }, token });
  } catch (err) {
    next(err);
  }
};

/**
 * Login: email, password
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id, role: user.role });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, skills: user.skills }, token });
  } catch (err) {
    next(err);
  }
};
