const express = require('express');
const multer = require('multer');
const Announcement = require('../models/Announcement');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Post Announcement
router.post('/', upload.single('file'), async (req, res) => {
  const { title, content } = req.body;
  const file = req.file?.path || null;

  try {
    const announcement = new Announcement({ title, content, file });
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
