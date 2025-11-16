// controller/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/user');

// Show all available doctors (for patients)
exports.showAvailableDoctors = async (req, res) => {
  try {
    // if you use role in user: { role: 'doctor' }
    const doctors = await User.find({ role: 'doctor' }).lean();
    res.render('availableDoctors', { doctors, user: req.user });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).send('Error fetching doctors');
  }
};

// Show booking form for a specific doctor
exports.bookDoctorPage = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.doctorId).lean();
    if (!doctor) return res.status(404).send('Doctor not found');

    // You can customize these slots or fetch from DB later
    const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'];

    res.render('bookAppointment', { doctor, timeSlots, user: req.user });
  } catch (err) {
    console.error('Error loading booking page:', err);
    res.status(500).send('Error loading booking page');
  }
};

// Handle appointment booking
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;

    if (!doctorId || !date || !timeSlot) {
      return res.status(400).send('All fields are required');
    }

    const appointment = new Appointment({
      patientId: req.user._id,
      doctorId,
      date,
      timeSlot,
      status: 'Pending',
    });

    await appointment.save();

    // Redirect to patient's appointment list
    return res.redirect('/appointments/my');
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).send('Server Error while booking appointment');
  }
};

// Show appointments for the logged-in patient
exports.myAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id })
      .populate('doctorId', 'name email')
      .sort({ date: 1 })
      .lean();

    res.render('myAppointments', { appointments, user: req.user });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).send('Error fetching appointments');
  }
};

// (Optional) Show appointments for doctor
exports.doctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user._id })
      .populate('patientId', 'name email')
      .sort({ date: 1 })
      .lean();

    res.render('doctorAppointments', { appointments, user: req.user });
  } catch (err) {
    console.error('Error fetching doctor appointments:', err);
    res.status(500).send('Error fetching doctor appointments');
  }
};

// (Optional) Update appointment status (doctor side)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Pending / Approved / Completed / Cancelled

    await Appointment.findByIdAndUpdate(id, { status });
    res.redirect('/appointments/doctor');
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).send('Error updating appointment status');
  }
};
