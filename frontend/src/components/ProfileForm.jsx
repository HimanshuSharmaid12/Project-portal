import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfileForm({ onSave }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    skills: user?.skills?.join(", ") || "",
    experience: user?.experience || "",
    education: user?.education || "",
    location: user?.location || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>

      {["name", "skills", "experience", "education", "location"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="block text-gray-700 capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
