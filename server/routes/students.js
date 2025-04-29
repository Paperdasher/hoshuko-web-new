const express = require('express');
const User = require('../models/User');

const router = express.Router();

// List students sorted by grade then name
router.get('/', async (req, res) => {
  try {
    const students = await User.find().sort({ grade: 1, romajiName: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
