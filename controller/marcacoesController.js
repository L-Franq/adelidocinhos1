const marcacoesModel = require("../models/marcacoesModel");

async function criarMarcacaoUser(req, res) {
  try {
    const { dia, turno, hora, descricao, lugar } = req.body;

    const idUsuario = req.session.user.id;

    await marcacoesModel.criarMarcacaoUser({
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

async function buscarMarcacao(req, res) {
  try {
    const dia = req.params;

    if (!dia) return res.status(401).json({ erro: "Sem Registro!" });

    const marcacao = await marcacoesModel.buscarMarcacao(dia);

    if (!marcacao)
      return res.status(404).json({ erro: "Registro nao Encontrado!" });

    res.json(marcacao);
  } catch (err) {
    res.status(500).json({ erro: "Falha ao buscar marcacao." });
  }
}

async function apagarMarcacao(req, res) {
  try {
    const id = req.params;

    if (!id) {
      return res.json(401).json({ erro: "Sem registro!" });
    }

    const marcacao = await marcacoesModel.apagarMarcacao(id);

    if (!marcacao) res.status(404).json({ erro: "Marcacao nao encontrada." });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao buscar marcacao" });
  }
}

module.exports = { criarMarcacaoUser, buscarMarcacao, apagarMarcacao };
