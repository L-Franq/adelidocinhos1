function isUser(req, res, next) {
  if (req.session.user) next();

  return res.redirect("/login-cadastrar");
}

module.exports = isUser;
