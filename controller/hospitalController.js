// controller/hospitalController.js
const Hospital = require('../models/hospital');

// Show all hospitals with doctors
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().lean();
    res.render('hospitals', { hospitals, user: req.user });
  } catch (err) {
    console.error('Error fetching hospitals:', err);
    res.status(500).send('Server Error');
  }
};

// Add a new hospital (optional - admin)
exports.addHospital = async (req, res) => {
  try {
    const { name, location, contact } = req.body;
    if (!name || !location) {
      return res.status(400).send('Name and location are required');
    }
    const hospital = new Hospital({ name, location, contact });
    await hospital.save();
    res.redirect('/hospitals');
  } catch (err) {
    console.error('Error adding hospital:', err);
    res.status(500).send('Error adding hospital');
  }
};
