const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true }, // 6 digit ID
  password: { type: String, required: true }, // hashed
  name: { type: String, required: true }, // Kanji name
  furigana: { type: String, required: true }, // フリガナ
  romajiName: { type: String, required: true }, // Name in Romaji
  grade: { 
    type: String, 
    enum: ['中1', '中2', '中3', '高1', '高2'], 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[\w-\.]+@nyhoshuko\.org$/, 'Email must be a @nyhoshuko.org email']
  },
  position: { type: String, default: null }, // Student gov position, assigned later
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
