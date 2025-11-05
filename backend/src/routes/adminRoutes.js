const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

router.use(auth, role("admin"));

router.get("/overview", adminController.overview);
router.put("/jobs/:id/approve", adminController.approveJob);
router.put("/jobs/:id/reject", adminController.rejectJob);

module.exports = router;
