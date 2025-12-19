// models/Prescription.js
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',           // assuming patients are also stored in User model
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',           // assuming doctors are also in User model
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },
    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String },          // e.g. "1 tablet"
        frequency: { type: String },       // e.g. "twice a day"
        duration: { type: String },        // e.g. "5 days"
        notes: { type: String },
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// avoid OverwriteModelError if file is imported multiple times
module.exports =
  mongoose.models.Prescription ||
  mongoose.model('Prescription', prescriptionSchema);
