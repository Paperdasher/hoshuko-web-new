const express = require('express');
const Minutes = require('../models/Minutes');

const router = express.Router();

// Post Meeting Minutes
router.post('/', async (req, res) => {
  const { content } = req.body;
  try {
    const minutes = new Minutes({ content });
    await minutes.save();
    res.status(201).json(minutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Minutes
router.get('/', async (req, res) => {
  try {
    const minutes = await Minutes.find().sort({ createdAt: -1 });
    res.json(minutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
