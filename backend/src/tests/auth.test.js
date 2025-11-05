/**
 * tests/auth.test.js
 * Tests the authentication routes: register and login.
 */
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");
require("dotenv").config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || "mongodb://localhost:27017/jobify_test");
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  let token;

  test("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "candidate"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("should not register duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Duplicate",
        email: "test@example.com",
        password: "password123",
      });
    expect(res.statusCode).toBe(409);
  });

  test("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should reject wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrong" });
    expect(res.statusCode).toBe(401);
  });
});
