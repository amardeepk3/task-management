const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ user: {username, email} , token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user: {_id: user._id, username: user.username, email: user.email} , token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Protected route example
// exports.getProfile = async (req, res) => {
//   res.status(200).json({ user: req.user });
// };
