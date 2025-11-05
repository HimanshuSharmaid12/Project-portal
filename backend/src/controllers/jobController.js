const Job = require("../models/Job");
const { getRecommendations } = require("../services/recommendationService");
const { notify } = require("../services/notificationService");

exports.listJobs = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.recruiter) filter.recruiter_id = req.query.recruiter;
    const jobs = await Job.find(filter).where("status").ne("closed");
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.recruiter_id = req.user._id;
    // new jobs default to pending, admin may approve later
    const job = await Job.create(payload);
    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

/**
 * Recommend jobs for a user: calls AI service via recommendationService,
 * then fetch job details and return top matches.
 */
exports.recommendJobs = async (req, res, next) => {
  try {
    const skills = req.body.skills || req.user?.skills || [];
    const aiResponse = await getRecommendations({ userId: req.user._id, skills });
    // aiResponse expected { recommendations: [jobId1, ...] } or jobs
    let recommendedJobs = [];
    if (Array.isArray(aiResponse?.recommendations)) {
      recommendedJobs = await Job.find({ _id: { $in: aiResponse.recommendations } }).limit(10);
    } else if (Array.isArray(aiResponse)) {
      // if AI returns job objects
      recommendedJobs = aiResponse;
    }
    res.json(recommendedJobs.slice(0, 5));
  } catch (err) {
    next(err);
  }
};
