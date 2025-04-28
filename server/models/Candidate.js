const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: String,
  grade: String,
  bio: String,
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Election' },
  votes: { type: Number, default: 0 },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
