const express = require("express");
const router = express.Router();
const path = require("path");
const admController = require("../controller/admController");

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html")
  );
});

router.get("/dados", admController.getDadosAdm);

module.exports = router;
