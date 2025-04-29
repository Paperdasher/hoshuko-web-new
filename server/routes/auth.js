const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Signup
router.post('/signup', async (req, res) => {
  const { studentId, password, name, furigana, romajiName, grade, email } = req.body;

  try {
    const existingUser = await User.findOne({ studentId });
    if (existingUser) return res.status(400).json({ message: 'Student ID already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      studentId,
      password: hashedPassword,
      name,
      furigana,
      romajiName,
      grade,
      email,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        studentId: user.studentId,
        name: user.name,
        position: user.position,
        isAdmin: user.isAdmin,
        grade: user.grade,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Assign Position
router.put('/assign-position/:id', requireAuth, async (req, res) => {
  const { position } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { position }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Position assigned', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Users
router.get('/users', requireAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
