// import { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const data = localStorage.getItem("user");
//     if (data) setUser(JSON.parse(data));
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



 import { useContext, createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";

// Create Context
export const AuthContext = createContext();

// ✅ Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("jobify_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login Function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError("");
      const res = await loginUser(credentials);
      if (res?.token) {
        localStorage.setItem("jobify_user", JSON.stringify(res.user));
        localStorage.setItem("jobify_token", res.token);
        setUser(res.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Register Function
  const register = async (data) => {
    try {
      setLoading(true);
      setError("");
      const res = await registerUser(data);
      if (res?.token) {
        localStorage.setItem("jobify_user", JSON.stringify(res.user));
        localStorage.setItem("jobify_token", res.token);
        setUser(res.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("jobify_user");
    localStorage.removeItem("jobify_token");
    setUser(null);
  };

  // Persist Login
  useEffect(() => {
    const savedUser = localStorage.getItem("jobify_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
