const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "HTML", "userDashboard"));
});

router.get("/login-cadastrar", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "loginCadastrar.html")
  );
});

module.exports = router;
