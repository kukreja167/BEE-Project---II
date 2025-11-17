const PDFDocument = require("pdfkit");
const Prescription = require("../models/Prescription");

exports.downloadReport = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id)
    .populate("doctorId patientId")
    .lean();

  if (!prescription) return res.status(404).send("Not found");

  const doc = new PDFDocument({ margin: 40 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=prescription_${prescription._id}.pdf`
  );
  doc.pipe(res);

  doc.fontSize(20).text("Medical Prescription", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Patient: ${prescription.patientId.name}`);
  doc.text(`Doctor: ${prescription.doctorId.name}`);
  doc.text(`Date: ${new Date(prescription.date).toLocaleDateString()}`);
  doc.moveDown();
  doc.fontSize(14).text("Diagnosis:");
  doc.fontSize(12).text(prescription.diagnosis || "N/A");
  doc.moveDown();
  doc.fontSize(14).text("Medicines:");
  prescription.medicines.forEach((m, i) => {
    doc.fontSize(12).text(
      `${i + 1}. ${m.name} - ${m.dosage || ""} ${m.frequency || ""} ${
        m.duration || ""
      }`
    );
    if (m.notes) doc.text(`   Notes: ${m.notes}`);
  });
  if (prescription.notes) {
    doc.moveDown();
    doc.fontSize(14).text("Notes:");
    doc.fontSize(12).text(prescription.notes);
  }

  doc.end();
};