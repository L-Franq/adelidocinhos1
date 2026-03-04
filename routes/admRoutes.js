const express = require("express");
const router = express.Router();
const admController = require("../controller/admController");
const admMiddleware = require("../middleware/isAdm");
const authcontroller = require("../controller/authcontroller");
const path = require("path");
const marcacoesController = require("../controller/marcacoesController");
const userController = require("../controller/userController");

router.get("/", admMiddleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "HTML", "admDashboard.html"),
  );
});

router.post("/login", authcontroller.login);
router.get("/dados", admMiddleware, admController.getDadosAdm);
router.get("/marcacoes", admMiddleware, marcacoesController.pegarMarcacao);
router.post("/marcacoes", admMiddleware, marcacoesController.postarMarcacaoAdm);
router.delete(
  "/marcacoes/:id",
  admMiddleware,
  marcacoesController.eliminarMarcacao,
);
router.put(
  "/marcacoes/:id",
  admMiddleware,
  marcacoesController.renovararMarcacao,
);

router.delete("/deletarUser/:id", admMiddleware, userController.apagarUsuario);

module.exports = router;
