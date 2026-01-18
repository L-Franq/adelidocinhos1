function isUser(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  return res.status(401).json({erro: "Acesso nao autorizado!"});
}

module.exports = isUser;
