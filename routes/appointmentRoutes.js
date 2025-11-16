// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// All routes require login
router.get('/available', protect, appointmentController.showAvailableDoctors);
router.get('/book/:doctorId', protect, appointmentController.bookDoctorPage);
router.post('/book', protect, appointmentController.bookAppointment);
router.get('/my', protect, appointmentController.myAppointments);

// Optional doctor views
router.get('/doctor', protect, appointmentController.doctorAppointments);
router.post('/status/:id', protect, appointmentController.updateStatus);

module.exports = router;
