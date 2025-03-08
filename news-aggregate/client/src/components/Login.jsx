import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
      if (email === storedEmail && password === storedPassword) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true"); // Store login state
        navigate("/all-news"); // Redirect to All News
      } else {
        alert("Invalid credentials! Please check your email and password.");
      }
    } else {
      alert("No user found! Please register first.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-text">
          New User? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
