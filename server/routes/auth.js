const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = 'your_secret_key_here'; // Put in env later

// Get all users (admin use)
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Update a student's government position (admin use)
router.put('/assign-position/:id', async (req, res) => {
    const { position } = req.body;
    
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { position }, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ message: 'Position assigned', user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Signup route
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
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
