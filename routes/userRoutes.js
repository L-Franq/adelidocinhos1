const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../controller/authcontroller");
const userMiddleware = require("../middleware/isUser");
const userController = require("../controller/userController");
const marcacaoController = require("../controller/marcacoesController");
const db = require("../databases/db");

router.get("/", userMiddleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "userDashboard.html"),
  );
});

router.get("/lista", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "listaDeUsuarios.html"),
  );
});

router.get("/cadastrar-logar", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "loginCadastrar.html"),
  );
});

router.post("/login", auth.login);

router.get("/userDados", userMiddleware, userController.getDadosUser);

router.get("/userNomeId", userMiddleware, userController.getNomeId);

router.post("/cadastro", auth.cadastroUser);

router.post("/marcar", userMiddleware, marcacaoController.criarMarcacaoUser);

router.get("/marcacoes/mes", (req, res) => {
  const rows = db.all(`SELECT dia, turno FROM marcacoes`, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json([]);
    }
    const eventos = rows.map((m) => ({
      title: m.turno.toUpperCase(),
      start: m.dia,
      allDay: true,
      turno: m.turno,
    }));
    res.json(eventos);
  });
});

module.exports = router;
