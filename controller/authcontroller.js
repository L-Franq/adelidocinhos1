const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { findAdmByEmail } = require("../models/admModel");

async function cadastroUser(req, res) {
  try {
    const { cadastrarNome, cadastrarEmail, cadastrarTelefone, cadastrarSenha } =
      req.body;

    if (await userModel.buscarUserPorEmail(cadastrarEmail)) {
      return res.status(400).json({ erro: "Email ja registado." });
    }

    const senhaAsh = await bcrypt.hash(cadastrarSenha, 10);
    await userModel.criarUser(
      cadastrarNome,
      cadastrarEmail,
      cadastrarTelefone,
      senhaAsh,
    );

    res.json({ sucesso: true });
  } catch (error) {
    console.error("Falha no servidor: ", error);
    res
      .status(500)
      .json({
        erro: "Cadastro falhou! Servidor temporariamente indisponivel.",
      });
  }
}

async function login(req, res) {
  try {
    const { loginEmail, loginPassword } = req.body;

    let user = await findAdmByEmail(loginEmail);

    let tipo = "Adm";

    if (user) {
      if (loginPassword !== user.senha) {
        return res.status(401).json({ erro: "Senha incorreta" });
      }
    } else {
      user = await userModel.buscarUserPorEmail(loginEmail);
      tipo = "User";

      if (!user) {
        return res.status(401).json({ erro: "Usuário não encontrado" });
      }

      const senhaOk = await bcrypt.compare(loginPassword, user.senha);
      if (!senhaOk) {
        return res.status(401).json({ erro: "Senha incorreta" });
      }
    }

    req.session.user = {
      id: user.idadm || user.idusuario,
      tipo,
    };

    return res.json({
      sucesso: true,
      redirect: tipo === "Adm" ? "/adm" : "/user",
    });
  } catch (error) {
    console.error("Falha no servidor: ", error);
    res
      .status(500)
      .json({ erro: "O login falhou! Servidor temporariamente indisponivel." });
  }
}

module.exports = { cadastroUser, login };
