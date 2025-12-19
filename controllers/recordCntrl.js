const Prescription = require("../models/Prescription");

exports.myRecords = async (req, res) => {
  const prescriptions = await Prescription.find({ patientId: req.user._id })
    .populate("doctorId", "name specialization")
    .sort({ date: -1 })
    .lean();
  res.render("records", { prescriptions, user: req.user });
};

exports.createPrescriptionPage = async (req, res) => {
  const patientId = req.params.patientId;
  res.render("prescribe", { patientId, user: req.user });
};

exports.createPrescription = async (req, res) => {
  const { patientId, diagnosis, notes, name, dosage, frequency, duration, medNotes } =
    req.body;

  const medicines = [
    { name, dosage, frequency, duration, notes: medNotes },
  ];

  const p = new Prescription({
    patientId,
    doctorId: req.user._id,
    diagnosis,
    medicines,
    notes,
  });
  await p.save();
  res.redirect("/appointments/doctor");
};
