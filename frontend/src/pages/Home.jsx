import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import JobCard from "../components/JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs().then((res) => setJobs(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Job Application Portal</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Home;
