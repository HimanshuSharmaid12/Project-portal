const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permissions: { type: [String], default: [] }
});

module.exports = mongoose.model("Admin", AdminSchema);
