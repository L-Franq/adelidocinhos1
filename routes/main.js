const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

router.get("/Sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "HTML", "sobreNos.html"));
});

module.exports = router;
