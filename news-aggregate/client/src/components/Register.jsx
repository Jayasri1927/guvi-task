import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="register-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
