const mongoose = require('mongoose');

const MinutesSchema = new mongoose.Schema({
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Minutes', MinutesSchema);
