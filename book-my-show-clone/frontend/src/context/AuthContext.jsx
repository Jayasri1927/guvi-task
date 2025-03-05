import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext easily in other components
export const useAuth = () => useContext(AuthContext);

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  // Function to handle login
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Login failed", error);
      throw new Error(error.response?.data?.message || "Login failed!");
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
