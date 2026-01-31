const express = require("express");
const router = express.Router();
const admController = require("../controller/admController");
const admMiddleware = require("../middleware/isAdm");
const authcontroller = require("../controller/authcontroller");
const path = require("path");
const marcacoesController = require("../controller/marcacoesController");

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html"),
  );
});

router.post("/login", authcontroller.login);
router.get("/dados", admMiddleware, admController.getDadosAdm);
router.get("/marcacoes", admMiddleware, marcacoesController.buscarMarcacao);
router.post("/marcacoes", admMiddleware, marcacoesController.criarMarcacaoAdm);
router.delete(
  "/marcacoes/:id",
  admMiddleware,
  marcacoesController.apagarMarcacao,
);
router.put(
  "/marcacoes/:id",
  admMiddleware,
  marcacoesController.atualizarMarcacao,
);

module.exports = router;
