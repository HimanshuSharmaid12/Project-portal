const Application = require("../models/Application");
const Job = require("../models/Job");
const { notify } = require("../services/notificationService");

exports.applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    // check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // prevent duplicate
    const existing = await Application.findOne({ user_id: req.user._id, job_id: jobId });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const app = await Application.create({ user_id: req.user._id, job_id: jobId });
    // notify recruiter via socket if possible
    const io = req.app.get("io");
    notify(io, "new-application", { jobId, applicationId: app._id });
    res.status(201).json(app);
  } catch (err) {
    next(err);
  }
};

exports.myApplications = async (req, res, next) => {
  try {
    const apps = await Application.find({ user_id: req.user._id }).populate("job_id");
    res.json(apps);
  } catch (err) {
    next(err);
  }
};
