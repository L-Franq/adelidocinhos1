const mainModel = require("../models/mainModel");

async function mensagensDeVisitas(req, res) {
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
    console.error("Falha no servidor: ", error)
    res.status(500).json({ erro: "Falha ao Enviar! Servidor temporariamente indisponivel" });
  }
}

module.exports = { mensagensDeVisitas };
