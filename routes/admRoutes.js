const express = require("express");
const router = express.Router();
const admController = require("../controller/admController");
const admMiddleware = require("../middleware/isAdm");
const authcontroller = require("../controller/authcontroller");
const path = require("path");

router.get("/admDashboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html"),
  );
});

router.post("/login", authcontroller.login);

router.get("/dados", admMiddleware, admController.getDadosAdm);

module.exports = router;
