// src/api/auth.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });  // Replace with your backend URL

// Request Password Reset (Forgot Password)
export const requestPasswordReset = (email) => {
  return API.post('/auth/request-password-reset', { email });
};

// Reset Password using token
export const resetPassword = (token, newPassword) => {
  return API.post(`/auth/reset-password/${token}`, { password: newPassword });
};
