const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// Login user (no JWT)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For simplicity, store user in session (if using session)
    req.session.userId = user._id;  // Using session to track user
    res.json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Log out user (session-based)
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = { registerUser, loginUser, logoutUser };
