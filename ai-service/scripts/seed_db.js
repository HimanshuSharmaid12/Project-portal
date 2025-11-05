// scripts/seed_db.js
// Run: node scripts/seed_db.js
const fetch = require("node-fetch");

const API = process.env.API || "http://localhost:8000/api";

async function run() {
  console.log("Seeding sample recruiter and jobs...");
  // Register a recruiter
  const reg = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Seed Recruiter",
      email: "seed_recruiter@example.com",
      password: "password123",
      role: "recruiter"
    })
  });
  const rdata = await reg.json();
  if (!rdata.token) {
    console.log("Recruiter may already exist:", rdata);
  } else {
    console.log("created recruiter.");
  }

  // login
  const login = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "seed_recruiter@example.com", password: "password123" })
  });
  const ldata = await login.json();
  const token = ldata.token;
  if (!token) {
    console.error("Failed login", ldata);
    return;
  }

  const jobs = [
    { title: "Frontend Developer", description: "React, Tailwind", skills_required: ["React","Tailwind"], location: "Remote", salary: 60000 },
    { title: "Backend Developer", description: "Node.js, Express", skills_required: ["Node.js","Express"], location: "Remote", salary: 70000 }
  ];

  for (const job of jobs) {
    const res = await fetch(`${API}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(job)
    });
    console.log("posted job:", (await res.json()).title || await res.text());
  }
}

run().catch(err => console.error(err));
