// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // State to store email and password values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Reset error and message before each submission attempt
    setError(null);
    setMessage(null);

    try {
      // Send registration request to backend
      const response = await axios.post('http://localhost:5000/auth/register', {
        email,
        password,
      });

      // If registration is successful, show success message
      setMessage(response.data.message);
    } catch (error) {
      // If there is an error, show the error message
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
