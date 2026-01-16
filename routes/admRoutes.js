const express = require("express");
const router = express.Router();
const path = require("path");
//const admController = require("../controller/admController");
const isAdm = require("../middleware/isAdm");
const authcontroller = require("../controller/authcontroller");

router.get("/dashboard", isAdm, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html")
  );
});

router.post("/login", authcontroller.login);

//router.get("/dados", isAdm, admController.getDadosAdm);

module.exports = router;
