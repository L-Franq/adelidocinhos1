const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const findAdmByEmail = require("../models/admModel");
const findUserByemail = require("../models/userModel");

async function cadastroUser(req, res) {
  const { cadastrarNome, cadastrarEmail, cadastrarTelefone, cadastrarSenha } =
    req.body;

  if (await userModel.buscarUserPorEmail(cadastrarEmail)) {
    return res.status(400).json({ erro: "Email já cadastrado" });
  }

  const senhaAsh = await bcrypt.hash(cadastrarSenha, 10);
  await userModel.criarUser(
    cadastrarNome,
    cadastrarEmail,
    cadastrarTelefone,
    senhaAsh
  );

  res.json({ sucesso: true });
}

async function login(req, res) {
  const { loginEmail, loginPassword } = req.body;

  let user = await findAdmByEmail(loginEmail);
  let tipo = "Adm";

  if (!user) {
    user = await findUserByemail(loginEmail);
    tipo = "User";
  }

  if (!user) return res.status(401).send("Usuario Nao encontrado.");

  const senhaOk = await bcrypt.compare(loginPassword, user.loginEmail);

  if (!senhaOk) return res.status(401).send("Senha Incorreta.");

  req.session.user = {
    id: id.user,
    tipo,
  };

  if ((tipo === "ADM")) {
    res.redirect("/adm/dashboard");
  } else {
    res.redirect("/user/userDashboard");
  }
}

module.exports = { cadastroUser, login };
