const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, default: null } // Path to uploaded image
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
