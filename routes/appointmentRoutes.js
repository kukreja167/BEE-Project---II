const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const appointmentController = require("../controllers/appointmentController");

router.post("/", protect, appointmentController.bookAppointment);
router.get("/patient/:id", protect, appointmentController.getPatientAppointments);
router.get("/doctor/:id", protect, appointmentController.getDoctorAppointments);
router.patch("/:id/confirm", protect, appointmentController.confirmAppointment);
router.patch("/:id/cancel", protect, appointmentController.cancelAppointment);

module.exports = router;
