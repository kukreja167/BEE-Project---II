const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, reason } = req.body;
    const appointment = new Appointment({ patient, doctor, date, reason });
    await appointment.save();
    res.json({ success: true, appointment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.id })
      .populate("doctor", "name email")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.id })
      .populate("patient", "name email")
      .sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
