// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Patient", 
      required: true 
    },
    doctor: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Doctor", 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    timeSlot: { 
      type: String, 
      required: true 
    },

    status: {
      type: String,
      enum: ["Pending", "confirmed", "cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

// Prevent double booking -> same doctor, same date, same timeSlot
appointmentSchema.index({ doctor: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
