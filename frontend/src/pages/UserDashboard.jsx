import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecommendations } from "../services/jobService";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (user?.skills) {
      getRecommendations(user.skills)
        .then((res) => setJobs(res.data))
        .catch(() => toast.error("Failed to fetch recommendations"));
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">
        Welcome, {user?.name || "Candidate"} 👋
      </h1>
      <p className="text-gray-600 mb-4">
        Based on your profile, here are your top job matches:
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p>No recommendations yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
