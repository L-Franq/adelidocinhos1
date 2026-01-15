function isAdm(req, res, next) {
  if (req.session.adm) return next();

  return res.redirect("/login-cadastrar");
}

module.exports = isAdm;
