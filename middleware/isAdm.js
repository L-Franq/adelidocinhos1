function isAdm(req, res, next) {
  if (req.session.user && req.session.user.tipo === "Adm") {
    return next();
  }

  return res.status(401).json({ erro: "Não autorizado" });
}

module.exports = isAdm;
