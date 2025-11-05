import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import JobDetails from "../pages/JobDetails";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function UserRoutes() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "candidate") return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
