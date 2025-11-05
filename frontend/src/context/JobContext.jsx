import { createContext, useState, useEffect } from "react";
import { getAllJobs, applyJob, postJob } from "../services/jobService";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllJobs();
      setJobs(res || []);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // Apply for a Job
  const handleApply = async (jobId) => {
    try {
      setLoading(true);
      await applyJob(jobId);
      alert("Application submitted successfully!");
    } catch (err) {
      alert("Error while applying for job");
    } finally {
      setLoading(false);
    }
  };

  // Recruiter Post Job
  const handlePostJob = async (jobData) => {
    try {
      setLoading(true);
      await postJob(jobData);
      alert("Job posted successfully!");
      fetchJobs();
    } catch (err) {
      alert("Error while posting job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        fetchJobs,
        handleApply,
        handlePostJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
