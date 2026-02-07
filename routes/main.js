const express = require("express");
const router = express.Router();
const path = require("path");
const mainController = require("../controller/mainController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});

router.get("/Sobre", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "HTML", "sobreNos.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "HTML", "contactar.html"));
});

router.post("/visitas", mainController.criarVisitas);
module.exports = router;
