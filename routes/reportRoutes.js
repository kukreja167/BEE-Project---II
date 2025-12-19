<<<<<<< HEAD:routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");

router.get("/download/:id", reportController.downloadReport);

module.exports = router;
=======
// routes/reportRoute.js
const express = require('express');
const PDFDocument = require('pdfkit');
const Prescription = require('../models/Prescription');
const router = express.Router();

router.get('/download/:id', async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .populate('doctorId patientId');

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Medical Prescription Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Doctor: ${prescription.doctorId.name}`);
  doc.text(`Patient: ${prescription.patientId.name}`);
  doc.text(`Diagnosis: ${prescription.diagnosis}`);
  doc.text(`Medicines: ${prescription.medicines}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.end();
});

module.exports = router;
>>>>>>> 850d0ba9d02f24c9ca9320b3396b2d0172ed83a9:backend/routes/reportRoutes.js
