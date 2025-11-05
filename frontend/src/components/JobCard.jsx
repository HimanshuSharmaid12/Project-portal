import { Link } from "react-router-dom";

const JobCard = ({ job }) => (
  <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="font-semibold text-lg">{job.title}</h3>
    <p className="text-sm text-gray-600 mt-1">{job.location}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {job.skills_required.map((s, i) => (
        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          {s}
        </span>
      ))}
    </div>
    <Link
      to={`/jobs/${job._id}`}
      className="inline-block mt-3 text-blue-600 font-medium hover:underline"
    >
      View Details →
    </Link>
  </div>
);
export default JobCard;
