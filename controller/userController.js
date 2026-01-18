const userModel = require("../models/userModel");

async function getDadosUser(req, res) {
  try {
    const idUser = req.session.user.idUsuario;

    const user = await userModel.buscarNomeUserPorId(idUser);
    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar User" });
  }
}

module.exports = {
  getDadosUser,
};
