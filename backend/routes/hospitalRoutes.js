// routes/hospitalRoutes.js
const express = require('express');
const router = express.Router();
// const hospitalController = require('../controllers/hospitalCntrl');
// const { protect } = require('../middleware/authMiddleware');

// View hospitals & doctors (patient can see)
// router.get('/', protect, hospitalController.getHospitals);

// Optional: Add hospital (admin/manual)
// router.post('/add', protect, hospitalController.addHospital);

module.exports = router;
