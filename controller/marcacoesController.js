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

async function criarMarcacaoAdm(req, res) {
  try {
    const { dia, turno, hora, descricao } = req.body;

    await marcacoesModel.criarMarcacaoAdm({
      dia,
      turno,
      hora,
      descricao,
      status: "ativo",
    });

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar marcacao ADM!" });
  }
}

async function buscarMarcacao(req, res) {
  try {
    const { dia } = req.query;

    if (!dia) return res.status(401).json({ erro: "Sem Registro!" });

    const marcacao = await marcacoesModel.buscarMarcacao(dia);

    res.json(marcacao || []);
  } catch (err) {
    res.status(500).json({ erro: "Falha ao buscar marcacao." });
  }
}

async function apagarMarcacao(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ erro: "Sem registro!" });
    }

    const changes = await marcacoesModel.apagarMarcacao(id);

    if (changes === 0)
      return res.status(404).json({ erro: "Marcacao nao encontrada." });

    return res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Falha a apagar marcacao" });
  }
}

async function atualizarMarcacao(req, res) {
  try {
    const { id } = req.params;

    const {hora, turno, descricao} = req.body;

    if (!id) return res.status(401).json({ erro: "Sem Registro!" });

    const changes = await marcacoesModel.atualizarMarcacao(id, hora, turno, descricao);

    if (changes === 0)
      return res.status(401).json({ erro: "Marcacao nao encontrada." });

    return res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Falha a atualizar marcacao" });
  }
}

module.exports = {
  criarMarcacaoUser,
  criarMarcacaoAdm,
  buscarMarcacao,
  apagarMarcacao,
  atualizarMarcacao,
};
