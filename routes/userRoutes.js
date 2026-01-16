const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../controller/authcontroller");

router.get("/userDashboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "userDashboard.html")
  );
});

router.post("/login", auth.login);

router.post("/", auth.cadastroUser);

module.exports = router;
