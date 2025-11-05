const User = require("../models/User");

exports.me = async (req, res, next) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-passwordHash");
    res.json(user);
  } catch (err) {
    next(err);
  }
};
