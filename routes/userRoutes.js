const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../controller/authcontroller");
const userMiddleware = require("../middleware/isUser");
const userController = require("../controller/userController");
const marcacaoController = require("../controller/marcacoesController");

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

router.get("/userDados", userMiddleware, userController.getDadosUser);

router.post("/cadastro", auth.cadastroUser);

router.post("/marcar", userMiddleware, marcacaoController.criarMarcacaoUser);

module.exports = router;
