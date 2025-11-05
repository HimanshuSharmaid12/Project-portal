/**
 * tests/job.test.js
 * Tests the job routes for CRUD and listing.
 */
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const Job = require("../src/models/Job");
require("dotenv").config();

let recruiterToken;
let jobId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || "mongodb://localhost:27017/jobify_test_jobs");
  await User.deleteMany({});
  await Job.deleteMany({});

  // Create a recruiter
  const recruiterRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Recruiter1",
      email: "recruiter@example.com",
      password: "password123",
      role: "recruiter"
    });

  recruiterToken = recruiterRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Job API", () => {
  test("should create a new job (recruiter only)", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${recruiterToken}`)
      .send({
        title: "Full Stack Developer",
        description: "React + Node.js Developer",
        skills_required: ["React", "Node.js"],
        salary: 90000,
        location: "Remote"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Full Stack Developer");
    jobId = res.body._id;
  });

  test("should get list of jobs", async () => {
    const res = await request(app).get("/api/jobs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("should fetch single job by id", async () => {
    const res = await request(app).get(`/api/jobs/${jobId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(jobId);
  });

  test("should update job details", async () => {
    const res = await request(app)
      .put(`/api/jobs/${jobId}`)
      .set("Authorization", `Bearer ${recruiterToken}`)
      .send({ salary: 95000 });
    expect(res.statusCode).toBe(200);
    expect(res.body.salary).toBe(95000);
  });

  test("should delete job", async () => {
    const res = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .set("Authorization", `Bearer ${recruiterToken}`);
    expect(res.statusCode).toBe(200);
  });
});
