const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create Post
router.post('/', upload.single('image'), async (req, res) => {
  const { heading, text } = req.body;
  const image = req.file?.path || null;

  try {
    const post = new Post({ heading, text, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Recent Posts
router.get('/recent', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
