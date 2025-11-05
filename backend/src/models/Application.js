const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: { type: String, enum: ["applied", "reviewed", "shortlisted", "rejected"], default: "applied" },
  applied_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", ApplicationSchema);
