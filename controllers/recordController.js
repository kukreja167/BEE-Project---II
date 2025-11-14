const MedicalRecord = require("../models/MedicalRecord");

exports.createRecord = async (req, res) => {
  try {
    const { patient, doctor, diagnosis, prescription } = req.body;
    const record = new MedicalRecord({ patient, doctor, diagnosis, prescription });
    await record.save();
    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getPatientRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.id })
      .populate("doctor", "name email");
    res.json(records);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.getDoctorRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ doctor: req.params.id })
      .populate("patient", "name email");
    res.json(records);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await MedicalRecord.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};
