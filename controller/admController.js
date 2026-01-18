const admModel = require("../models/admModel");

async function getDadosAdm(req, res) {
  try {
    const idAdm = req.session.user.id;

    const adm = await admModel.buscarNomeAdmPorId(idAdm);
    res.json(adm);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar ADM" });
  }
}

module.exports = {
  getDadosAdm
};
