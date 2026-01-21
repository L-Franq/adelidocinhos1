const marcacoesModel = require("../models/marcacoesModel");

async function criarMarcacao(req, res) {
  try {
    const { dia, turno, hora, descricao, lugar } = req.body;

    const idUsuario = req.session.user.id;

    await marcacoesModel.criarMarcacao({
      idUsuario,
      dia,
      turno,
      hora,
      descricao,
      lugar,
      status: "ativo",
    });

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar marcacao!" });
  }
}

module.exports = { criarMarcacao };
