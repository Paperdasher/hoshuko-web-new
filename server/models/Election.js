const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Election', ElectionSchema);
