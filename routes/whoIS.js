const express = require("express");
const router = express.Router();
//const session = require("express-session");

router.get("/whoami", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ erro: "Nao autenticado." });
  }

  res.json({ role: req.session.user.tipo });
});

module.exports = router;