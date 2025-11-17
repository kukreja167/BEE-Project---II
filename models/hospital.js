const mongoose = require("mongoose");

const doctorSubSchema = new mongoose.Schema(
  {
    name: String,
    specialization: String,
    available: { type: Boolean, default: true },
    timeSlots: [String],
  },
  { _id: false }
);

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: String,
    contact: String,
    doctors: [doctorSubSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
