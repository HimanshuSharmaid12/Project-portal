import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    skills_required: "",
    salary: "",
  });

  useEffect(() => {
    api.get("/jobs?recruiter=" + user?._id)
      .then((res) => setJobs(res.data))
      .catch(() => toast.error("Failed to fetch jobs"));
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills_required: form.skills_required.split(",").map((s) => s.trim()),
      };
      await api.post("/jobs", payload);
      toast.success("Job posted successfully!");
      setForm({
        title: "",
        description: "",
        location: "",
        skills_required: "",
        salary: "",
      });
    } catch {
      toast.error("Failed to post job");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow mb-6">
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="skills_required"
          placeholder="Required Skills (comma-separated)"
          value={form.skills_required}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Post Job
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your Jobs</h2>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job._id} className="border p-3 rounded bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
              <button
                onClick={() =>
                  api.delete(`/jobs/${job._id}`).then(() => toast.success("Job deleted"))
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;
