// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { jwtSecret, emailConfig } = require('../config/dbconfig');

// Helper function to send email
const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  });

  const resetLink = `http://localhost:3000/reset-password/${token}`;
  
  const mailOptions = {
    from: emailConfig.user,
    to: email,
    subject: 'Password Reset',
    text: `To reset your password, please click the link: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

// Forgot Password (request password reset link)
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    // Generate a reset token
    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });

    // Send reset email
    await sendResetEmail(user.email, token);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Reset Password (update the password with the token)
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const user = await User.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });

    if (!user) {
      return res.status(400).json({ error: 'Invalid token or user not found' });
    }

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Invalid or expired token' });
  }
};




// Example function to register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create a new user instance
    const newUser = new User({
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};






module.exports = {
  requestPasswordReset,
  resetPassword,
  registerUser,
};
