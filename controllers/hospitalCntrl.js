const Hospital = require("../models/hospital");

exports.getHospitals = async (req, res) => {
  const hospitals = await Hospital.find().lean();
  res.render("hospitals", { hospitals, user: req.user });
};
