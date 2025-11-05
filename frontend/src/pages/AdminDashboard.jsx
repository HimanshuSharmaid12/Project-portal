import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    api.get("/admin/overview")
      .then((res) => setOverview(res.data))
      .catch(() => toast.error("Failed to load admin data"));
  }, []);

  if (!overview) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-2xl font-bold">{overview.totalUsers}</h2>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-2xl font-bold">{overview.totalJobs}</h2>
          <p className="text-gray-600">Total Jobs</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-2xl font-bold">{overview.totalApplications}</h2>
          <p className="text-gray-600">Applications</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Recent Jobs Pending Approval</h2>
        {overview.pendingJobs.length === 0 ? (
          <p>No pending jobs</p>
        ) : (
          <ul className="space-y-3">
            {overview.pendingJobs.map((job) => (
              <li
                key={job._id}
                className="bg-white p-3 shadow rounded flex justify-between items-center"
              >
                <span>{job.title}</span>
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      api.put(`/admin/jobs/${job._id}/approve`).then(() => toast.success("Approved"))
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      api.put(`/admin/jobs/${job._id}/reject`).then(() => toast.info("Rejected"))
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
