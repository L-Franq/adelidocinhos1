const userModel = require("../models/userModel");

async function getDadosUser(req, res) {
  try {
    const idUser = req.session.user?.id;

    const user = await userModel.buscarNomeUserPorId(idUser);

    if (!user) {
      return res.status(404).json({ erro: "ADM não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar User" });
  }
}

async function getNomeId(req, res) {
  try {
    const user = await userModel.buscarTudoUser();

    if (!user) {
      return res.status(404).json({ erro: "User não encontrado" });
    }

    res.json(user || []);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar User" });
  }
}

async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ erro: "Sem ID" });
    }

    const changes = await userModel.deletarUsuario(id);

    if (changes === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    res.json({ sucesso: true });
  } catch (error) {
    return res.status(500).json({ erro: "Falha ao Deletar" });
  }
}

module.exports = {
  getDadosUser,
  getNomeId,
  deletarUsuario,
};
