const axios = require("axios");
require("dotenv").config();

const AI_URL = process.env.AI_SERVICE_URL || "http://localhost:5000/recommend";

/**
 * Call AI service to get recommended job IDs (or job objects).
 * Accepts candidate object or skills array.
 */
const getRecommendations = async ({ userId, skills = [] } = {}) => {
  try {
    const payload = { userId, skills };
    const { data } = await axios.post(AI_URL, payload, { timeout: 10000 });
    // Expect AI to return { recommendations: [jobId1, jobId2, ...] } or job objects
    return data;
  } catch (err) {
    console.error("AI service error", err.message);
    throw new Error("Recommendation service unavailable");
  }
};

module.exports = { getRecommendations };
