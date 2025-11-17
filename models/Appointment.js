// models/Appointment.js
<<<<<<< HEAD
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',   // because you have only user.js model
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true, // example: "10:00 AM - 10:30 AM"
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);
=======
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
>>>>>>> d1324ca6ecaa93a5fcda205fe291c83889ee1faa

module.exports = mongoose.model('Appointment', appointmentSchema);
