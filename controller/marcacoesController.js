const marcacoesModel = require("../models/marcacoesModel");

async function postarMarcacaoUser(req, res) {
  try {
    const { dia, turno, hora, descricao, lugar } = req.body;

    const idUsuario = req.session.user.id;
    const totalNumDias = await marcacoesModel.verificarDia(dia);
    console.log("totaINuser:", totalNumDias);

    if (totalNumDias < 3) {
      await marcacoesModel.criarMarcacaoUser({
        idUsuario,
        dia,
        turno,
        hora,
        descricao,
        lugar,
        status: "ativo",
      });
    } else if (totalNumDias < 5) {
      await marcacoesModel.criarMarcacaoUser({
        idUsuario,
        dia,
        turno: "espera",
        hora,
        descricao,
        lugar,
        status: "ativo",
      });
    } else {
      res
        .status(500)
        .json({ erro: "Dia Lotado! Nao ha mais vagas nem esperas." });
    }

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Tente mais tarde. Falha no servidor!" });
  }
}

async function postarMarcacaoAdm(req, res) {
  try {
    const { dia, turno, hora, descricao } = req.body;
    const totalNumDias = await marcacoesModel.verificarDia(dia);
    console.log("totaINadm:", totalNumDias);

    if (totalNumDias < 3) {
      await marcacoesModel.criarMarcacaoAdm({
        dia,
        turno,
        hora,
        descricao,
        status: "ativo",
      });
    } else if (totalNumDias < 5) {
      await marcacoesModel.criarMarcacaoAdm({
        dia,
        turno,
        hora,
        descricao,
        status: "ativo",
      });
    } else {
      res
        .status(400)
        .json({ erro: "Dia Lotado! Nao ha mais vagas nem esperas." });
    }

    res.json({ sucesso: true, mensagem: `Marcação salva como ${turno}` });
  } catch (err) {
    res
      .status(500)
      .json({ erro: "Erro ao criar marcacao. Falha no servidor!" });
  }
}

async function pegarMarcacao(req, res) {
  try {
    const { dia } = req.query;

    if (!dia) return res.status(401).json({ erro: "Sem Registro!" });

    const marcacao = await marcacoesModel.buscarMarcacao(dia);

    res.json(marcacao || []);
  } catch (err) {
    res.status(500).json({ erro: "Falha ao buscar marcacao." });
  }
}

async function eliminarMarcacao(req, res) {
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

async function renovararMarcacao(req, res) {
  try {
    const { id } = req.params;

    const { hora, turno, descricao } = req.body;

    if (!id) return res.status(401).json({ erro: "Sem Registro!" });

    const changes = await marcacoesModel.atualizarMarcacao(
      id,
      hora,
      turno,
      descricao,
    );

    if (changes === 0)
      return res.status(401).json({ erro: "Marcacao nao encontrada." });

    return res.json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Falha a atualizar marcacao" });
  }
}

module.exports = {
  postarMarcacaoUser,
  postarMarcacaoAdm,
  pegarMarcacao,
  eliminarMarcacao,
  renovararMarcacao,
};
