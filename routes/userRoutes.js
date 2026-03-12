const express = require("express");
const router = express.Router();
const path = require("path");
const controlerLogin = require("../controller/authcontroller");
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

router.post("/login", controlerLogin.login);

router.get("/userDados", userMiddleware, userController.getDadosUser);

router.get("/userNomeId", userMiddleware, userController.getNomeId);

router.post("/cadastro", controlerLogin.cadastroUser);

router.post("/marcar", userMiddleware, marcacaoController.postarMarcacaoUser);

router.get("/marcacoes/mes", async (req, res) => {
  const sql = `SELECT dia, turno FROM marcacoes`;

  try {
    const { rows } = await db.query(sql);

    // O Postgres devolve as colunas em minúsculas: 'm.dia' e 'm.turno'
    const eventos = rows.map((m) => ({
      title: m.turno.toUpperCase(),
      start: m.dia,
      allDay: true,
      turno: m.turno,
    }));

    res.json(eventos);
  } catch (err) {
    console.error("Erro ao buscar marcações do mês:", err);
    res.status(500).json([]);
  }
});

module.exports = router;
