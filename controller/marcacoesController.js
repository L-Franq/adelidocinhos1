const marcacoesModel = require("../models/marcacoesModel");

async function postarMarcacaoUser(req, res) {
  try {
    const { dia, turno, hora, descricao, lugar } = req.body;

    const horaTratada = (hora && hora.trim() !== "") ? hora : null;

    const idUsuario = req.session.user.id;
    const totalNumDias = await marcacoesModel.verificarDia(dia);

    if (totalNumDias < 3) {
      await marcacoesModel.criarMarcacaoUser({
        idUsuario,
        dia,
        turno,
        horaTratada,
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
        .status(400)
        .json({ erro: "Dia Lotado! Nao ha mais vagas nem esperas." });
    }

    res.json({ sucesso: true });
  } catch (error) {
    console.error("Falha no servidor: ", error)
    res.status(500).json({ erro: "Marcacao falhou! Tente mais tarde. problemas de conexao!" });
  }
}

async function postarMarcacaoAdm(req, res) {
  try {
    const { dia, turno, hora, descricao } = req.body;
    const totalNumDias = await marcacoesModel.verificarDia(dia);

    const horaTratada = (hora && hora.trim() !== "") ? hora : null;

    if (totalNumDias < 3) {
      await marcacoesModel.criarMarcacaoAdm({
        dia,
        turno,
        horaTratada,
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
  } catch (error) {
    console.error("Falha no servidor: ", error)
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
  } catch (error) {
    console.error("Falha no servidor: ", error)
    res.status(500).json({ erro: "Falha a apagar marcacao! tente mais tarde." });
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
  } catch (error) {
    console.error("Falha no servidor: ", error);
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
