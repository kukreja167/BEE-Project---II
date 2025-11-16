const Appointment = require("../models/Appointment");
const redis = require("../config/redis");


const getCacheKey = (type, id) => `${type}_appointments_${id}`;


exports.bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, reason } = req.body;

    if (!patient || !doctor || !date || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }


    const exists = await Appointment.findOne({ doctor, date });
    if (exists) {
      return res.status(409).json({ error: "Slot already booked" });
    }

    const appointment = new Appointment({ patient, doctor, date, reason });
    await appointment.save();

    await redis.del(getCacheKey("patient", patient));
    await redis.del(getCacheKey("doctor", doctor));

    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.params.id;

    const cacheKey = getCacheKey("patient", patientId);
    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "name email")
      .sort({ date: -1 });


    await redis.setEx(cacheKey, 300, JSON.stringify(appointments));

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const cacheKey = getCacheKey("doctor", doctorId);

    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email")
      .sort({ date: -1 });

    await redis.setEx(cacheKey, 300, JSON.stringify(appointments));

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Invalidate related caches
    await redis.del(getCacheKey("patient", appointment.patient));
    await redis.del(getCacheKey("doctor", appointment.doctor));

    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Invalidate cache
    await redis.del(getCacheKey("patient", appointment.patient));
    await redis.del(getCacheKey("doctor", appointment.doctor));

    res.json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
