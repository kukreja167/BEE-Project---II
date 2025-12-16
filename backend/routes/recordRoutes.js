const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const recordController = require("../controllers/recordController");

router.post("/", protect, recordController.createRecord);
router.get("/patient/:id", protect, recordController.getPatientRecords);
router.get("/doctor/:id", protect, recordController.getDoctorRecords);
router.patch("/:id", protect, recordController.updateRecord);
router.delete("/:id", protect, recordController.deleteRecord);

module.exports = router;
