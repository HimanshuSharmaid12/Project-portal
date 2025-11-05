// 🌍 API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// 🧑‍ Roles
export const USER_ROLES = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
};

// 🪪 Token Keys
export const STORAGE_KEYS = {
  USER: "jobify_user",
  TOKEN: "jobify_token",
};

// 📊 Application Status
export const APPLICATION_STATUS = {
  APPLIED: "applied",
  REVIEWED: "reviewed",
  SHORTLISTED: "shortlisted",
  REJECTED: "rejected",
};

// 💼 Job Status
export const JOB_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
};

// 🎨 UI Constants
export const COLORS = {
  primary: "#2563eb", // blue-600
  secondary: "#64748b", // gray-500
  success: "#16a34a", // green-600
  danger: "#dc2626", // red-600
};
