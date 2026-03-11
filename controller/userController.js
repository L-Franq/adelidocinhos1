const userModel = require("../models/userModel");

async function getDadosUser(req, res) {
  try {
    const idUser = req.session.user?.id;

    const user = await userModel.buscarNomeUserPorId(idUser);

    if (!user) {
      return res.status(404).json({ erro: "User não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Falha no servidor: ", error)
    res.status(500).json({ erro: "Erro ao buscar nome" });
  }
}

async function getNomeId(req, res) {
  try {
    const user = await userModel.buscarTudoUser();

    if (!user) {
      return res.status(404).json({ erro: "usuario não encontrado" });
    }

    res.json(user || []);
  } catch (error) {
    res.status(500).json({ erro: "Falha no servidor! erro ao buscar usuraio" });
  }
}

async function apagarUsuario(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: "Usuario sem ID" });
    }

    const changes = await userModel.deletarUsuario(id);

    if (changes === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    res.json({ sucesso: true });
  } catch (error) {
    console.error("Falha no servidor: ", error)
    return res.status(500).json({ erro: "Falha ao deletar! servidor indisponivel." });
  }
}

module.exports = {
  getDadosUser,
  getNomeId,
  apagarUsuario,
};
