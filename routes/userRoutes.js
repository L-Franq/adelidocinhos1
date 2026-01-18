const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../controller/authcontroller");
const userMiddleware = require("../middleware/isUser");
const userController = require("../controller/userController");

router.get("/userDashboard", userMiddleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "userDashboard.html"),
  );
});

router.get("/cadastrar-logar", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "loginCadastrar.html"),
  );
});

router.post("/login", auth.login);

router.get("/userDados", userController.getDadosUser);

router.post("/cadastro", auth.cadastroUser);

module.exports = router;
