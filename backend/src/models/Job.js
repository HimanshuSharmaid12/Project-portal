const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  skills_required: { type: [String], default: [] },
  location: { type: String },
  salary: { type: Number },
  recruiter_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["open", "closed", "pending"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
