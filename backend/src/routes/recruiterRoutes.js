const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const recruiterController = require("../controllers/recruiterController");

router.use(auth, role("recruiter"));

router.get("/me", recruiterController.me);
router.get("/candidates/:jobId", recruiterController.getCandidatesForJob);

module.exports = router;
