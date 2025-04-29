const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\d{6}$/, 'Student ID must be 6 digits']
  },
  password: { type: String, required: true }, // hashed password
  name: { type: String, required: true }, // Kanji
  furigana: { type: String, required: true }, // フリガナ
  romajiName: { type: String, required: true }, // Romaji Name
  grade: { 
    type: String, 
    required: true,
    enum: ['中1', '中2', '中3', '高1', '高2']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@nyhoshuko\.org$/, 'Email must be @nyhoshuko.org']
  },
  position: { 
    type: String, 
    default: null 
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
