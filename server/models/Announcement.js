const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  file: { type: String, default: null } // Path to uploaded file (like PDF)
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
