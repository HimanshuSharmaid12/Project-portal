import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      login(data.user);
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
       navigate("/");



 //  Redirect based on user role
      const role = data.user?.role?.toLowerCase();

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "recruiter") navigate("/recruiter/dashboard");
      else navigate("/user/dashboard");

    }
    catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (

 
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">

      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="Email"
          value={form.email} onChange={handleChange} className="border p-2 w-full rounded" />
        <input name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange} className="border p-2 w-full rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>

 
  
  );
};

export default Login;
