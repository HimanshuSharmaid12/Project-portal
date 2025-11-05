import { Routes, Route, Navigate } from "react-router-dom";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import JobDetails from "../pages/JobDetails";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function RecruiterRoutes() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "recruiter") return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route path="/dashboard" element={<RecruiterDashboard />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
