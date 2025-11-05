import api from "./api";

export const getAllJobs = async () => api.get("/jobs");
export const getJobById = async (id) => api.get(`/jobs/${id}`);
export const applyJob = async (id) => api.post(`/jobs/apply/${id}`);
export const getRecommendations = async (skills) =>
  api.post("/recommend", { skills });
