const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/Adm", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html")
  );
});

router.get("/Agenda", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "AgendaConfeitaria.html")
  );
});

module.exports = router;
