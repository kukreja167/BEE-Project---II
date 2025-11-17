
const Appointment = require('../models/Appointment');
const User = require('../models/user');
const { Publisher } = require("../shared/redis.js");



exports.showAvailableDoctors = async (req, res) => {
  try {
    
    const doctors = await User.find({ role: 'doctor' }).lean();
    res.render('availableDoctors', { doctors, user: req.user });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.send('Error fetching doctors');
  }
};


exports.bookDoctorPage = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.doctorId).lean();
    if (!doctor) return res.send('Doctor not found');


    const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'];

    res.render('bookAppointment', { doctor, timeSlots, user: req.user });
  } catch (err) {
    console.error('Error loading booking page:', err);
    res.send('Error loading booking page');
  }
};


exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;
    const appt = new Appointment({
      patientId: req.user._id,
      doctorId,
      date,
      timeSlot,
      reason
    });
    await appt.save();

    await Publisher.publish(
      "appointment:new",
      JSON.stringify({
        id: appt._id,
        doctorId,
        patientId: req.user._id,
        date,
        timeSlot
      })
    );

    res.redirect("/appointments/my");
  } catch (err) {
    res.send("Server error");
  }
};

exports.myAppointments = async (req, res) => {
  
    const appointments = await Appointment.find({ patientId: req.user._id })
      .populate('doctorId', 'name specialization')
      .sort({ date: 1 })
      .lean();

    res.render('myAppointments', { appointments, user: req.user });
   
};


exports.doctorAppointments = async (req, res) => {
  
    const appointments = await Appointment.find({ doctorId: req.user._id })
      .populate('patientId', 'name email')
      .sort({ date: 1 })
      .lean();

    res.render('doctorAppointments', { appointments, user: req.user });
  
};


exports.updateStatus = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body; 

    await Appointment.findByIdAndUpdate(id, { status });

    await Publisher.publish(
      "appointment:status",
      JSON.stringify({
        id,
        status
      })
    );
    res.redirect('/appointments/doctor');
  
};
