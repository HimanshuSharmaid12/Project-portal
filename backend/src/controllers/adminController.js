const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.overview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const pendingJobs = await Job.find({ status: "pending" }).limit(10);
    res.json({
      totalUsers,
      totalJobs,
      totalApplications,
      pendingJobs
    });
  } catch (err) {
    next(err);
  }
};

exports.approveJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: "open" }, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.rejectJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: "closed" }, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
};
