import { STORAGE_KEYS } from "./constants";

// 🪙 Token Helpers
export const getToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN);
export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};
export const saveUserData = (user, token) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};
export const clearUserData = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// 🕒 Date Formatting
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// 🧠 Skill List Helper
export const parseSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  return skills.split(",").map((s) => s.trim());
};

// 🧮 Calculate Job Match Percentage
export const calculateMatchScore = (candidateSkills, jobSkills) => {
  if (!candidateSkills?.length || !jobSkills?.length) return 0;
  const matches = candidateSkills.filter((skill) =>
    jobSkills.includes(skill)
  ).length;
  return Math.round((matches / jobSkills.length) * 100);
};

// ⚙️ Delay Utility (for mock async behavior)
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
