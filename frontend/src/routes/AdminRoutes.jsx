import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoutes() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
