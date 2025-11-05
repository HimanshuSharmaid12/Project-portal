const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const applicationController = require("../controllers/applicationController");

router.post("/apply/:jobId", auth, applicationController.applyJob);
router.get("/my", auth, applicationController.myApplications);

module.exports = router;
