import { useState } from "react";

export default function JobPostForm({ onSubmit }) {
  const [job, setJob] = useState({
    title: "",
    description: "",
    skills_required: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedJob = {
      ...job,
      skills_required: job.skills_required.split(",").map((s) => s.trim()),
    };
    onSubmit(formattedJob);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Post a Job</h2>

      {["title", "description", "skills_required", "location", "salary"].map(
        (field) => (
          <div className="mb-3" key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={job[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
        )
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
      >
        Post Job
      </button>
    </form>
  );
}
