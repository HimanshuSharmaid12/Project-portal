const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// public
router.get("/", jobController.listJobs);
router.get("/:id", jobController.getJobById);

// protected actions
router.post("/", auth, role("recruiter"), jobController.createJob);
router.put("/:id", auth, role("recruiter"), jobController.updateJob);
router.delete("/:id", auth, role("recruiter"), jobController.deleteJob);

// recommendation endpoint - any authenticated user
router.post("/recommend", auth, jobController.recommendJobs);

module.exports = router;
