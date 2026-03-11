const admModel = require("../models/admModel");
const userModel = require("../models/userModel");

async function getDadosAdm(req, res) {
  try {
    const idAdm = req.session.user?.id;
    if (!idAdm) {
      return res.status(401).json({ erro: "ADM não logado" });
    }

    const adm = await admModel.buscarNomeAdmPorId(idAdm);
    

    if (!adm) {
      return res.status(404).json({ erro: "ADM não encontrado" });
    }

    res.json(adm);
  } catch (error) {
    console.error("Falha no servidor: ", error);
    res.status(500).json({ erro: "Erro ao buscar ADM" });
  }
}

async function getDadosUser(req, res) {
  try{

    const iduser = req.session.user?.id;

    const user = await userModel.buscarUser(iduser);
    
    if (!user) {
      return res.status(401).json({ erro: "erro" });
    }

    res.json(user);
  }
  catch(error){
    console.error("Falha no servidor: ", error)
    res.status(500).json({erro: "A requisicao falhou! Servidor temporariamente indisponivel."});
  }
}

module.exports = { getDadosAdm, getDadosUser};
