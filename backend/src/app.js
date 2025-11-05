// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const path = require("path");
// const { errorHandler } = require("./middleware/errorHandler");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const recruiterRoutes = require("./routes/recruiterRoutes");
// const jobRoutes = require("./routes/jobRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// const app = express();

// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || "*",
// }));

// // static uploads (resume/profile)
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/recruiter", recruiterRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/applications", applicationRoutes);
// app.use("/api/admin", adminRoutes);

// // health
// app.get("/api/health", (req, res) => res.json({ ok: true, time: Date.now() }));

// // error handler (last)
// app.use(errorHandler);

// module.exports = app;


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
}));

// Static uploads (resume/profile)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true, time: Date.now() }));

// Error handler (last)
app.use(errorHandler);

module.exports = app;
