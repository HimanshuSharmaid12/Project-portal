import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">JobifyAI</Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
          </>
        ) : (
          <>
            <Link to={`/${user.role}/dashboard`} className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <button onClick={logout} className="bg-blue-600 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
