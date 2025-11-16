// models/Hospital.js
const mongoose = require('mongoose');

const doctorSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String },
    available: { type: Boolean, default: true },
    timeSlots: [String], // e.g. ["9:00 AM", "10:30 AM"]
  },
  { _id: false }
);

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String },
    doctors: [doctorSubSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hospital', hospitalSchema);
