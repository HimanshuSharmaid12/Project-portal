import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById, applyJob } from "../services/jobService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getJobById(id)
      .then((res) => setJob(res.data))
      .catch(() => toast.error("Failed to load job details"));
  }, [id]);

  const handleApply = () => {
    applyJob(id)
      .then(() => toast.success("Applied successfully!"))
      .catch(() => toast.error("Application failed"));
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mt-1">{job.location}</p>
      <p className="mt-4 text-gray-800">{job.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skills_required.map((s, i) => (
          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
            {s}
          </span>
        ))}
      </div>
      <p className="mt-3 font-semibold">Salary: ₹{job.salary}</p>
      {user?.role === "user" && (
        <button
          onClick={handleApply}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Now
        </button>
      )}
    </div>
  );
};

export default JobDetails;
