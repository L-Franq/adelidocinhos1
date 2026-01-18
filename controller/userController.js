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

module.exports = {
  getDadosUser,
};
