const mainModel = require("../models/mainModel");

async function criarVisitas(req, res) {
  try {
    const { nome, email, telefone, assunto } = req.body;

    await mainModel.criarVisitas(
      nome,
      email,
      telefone,
      assunto,
    );

    res.json({ sucesso: true });
  } catch (error) {
    res.status(500).json({ erro: "Falha ao Enviar!" });
  }
}

module.exports = { criarVisitas };
