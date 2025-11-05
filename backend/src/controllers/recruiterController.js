const Application = require("../models/Application");
const User = require("../models/User");

exports.me = async (req, res, next) => {
  res.json(req.user);
};

exports.getCandidatesForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job_id: jobId }).populate("user_id", "-passwordHash");
    res.json(applications);
  } catch (err) {
    next(err);
  }
};
