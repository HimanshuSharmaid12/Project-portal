import api from "./api";

export const registerUser = async (data) => api.post("/auth/register", data);
export const loginUser = async (data) => api.post("/auth/login", data);
