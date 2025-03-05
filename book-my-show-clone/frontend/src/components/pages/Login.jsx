import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password); // Call the login function
      navigate("/movie"); // Redirect to movies page after login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={styles.input} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={styles.input} />
        
        {error && <p style={styles.error}>{error}</p>}
        
        <button type="submit" disabled={loading || !email || !password} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={styles.switchText}>
        Don't have an account? <span style={styles.link} onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

// 💄 Inline Styles
const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", textAlign: "center", backgroundColor: "#333", color: "#fff", borderRadius: "10px" },
  heading: { marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "none", outline: "none" },
  button: { padding: "10px", fontSize: "18px", backgroundColor: "#ff4500", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", fontSize: "14px" },
  switchText: { marginTop: "10px" },
  link: { color: "#ff4500", cursor: "pointer", textDecoration: "underline" }
};

export default Login;
