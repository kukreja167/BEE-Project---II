// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['doctor', 'patient', 'admin'], default: 'patient' },

    // add any other fields you already had:
    age: Number,
    gender: String,
  },
  { timestamps: true }
);

// ✅ Important: prevent OverwriteModelError
module.exports =
  mongoose.models.User || mongoose.model('User', userSchema);
