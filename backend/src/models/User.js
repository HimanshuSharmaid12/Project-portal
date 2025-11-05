const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["candidate", "recruiter", "admin","user"], default: "candidate" },
  passwordHash: { type: String, required: true },
  skills: { type: [String], default: [] },
  experience: { type: String },
  education: { type: String },
  location: { type: String },
  resumeUrl: { type: String },
  profilePic: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
