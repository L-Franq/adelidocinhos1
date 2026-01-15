const express = require("express");
const router = express.Router();
const path = require("path");
const admController = require("../controller/admController");
const isAdm = require("../middleware/isAdm");

router.get("/", isAdm, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html")
  );
});

router.get("/dados", isAdm, admController.getDadosAdm);

module.exports = router;
