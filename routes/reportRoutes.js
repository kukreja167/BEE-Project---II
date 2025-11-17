const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");

router.get("/download/:id", reportController.downloadReport);

module.exports = router;