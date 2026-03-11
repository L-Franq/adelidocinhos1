const db = require("../databases/db");

async function criarMarcacaoUser({ idUsuario, dia, turno, hora, descricao, lugar }) {
  const sql = `
    INSERT INTO marcacoes (idUsuario, dia, turno, hora, descricao, lugar) 
    VALUES($1, $2, $3, $4, $5, $6) 
    RETURNING idMarc`;
  
  try {
    const res = await db.query(sql, [idUsuario, dia, turno, hora, descricao, lugar]);
    return res.rows[0].idmarc;
  } catch (err) {
    throw err;
  }
}

// 2. Verificar total de marcações no dia
async function verificarDia(dia) {
  const sql = `SELECT COUNT(*) as total FROM marcacoes WHERE dia = $1`;
  
  try {
    const res = await db.query(sql, [dia]);
    // O COUNT no Postgres retorna uma string, usamos parseInt para garantir número
    return parseInt(res.rows[0].total) || 0;
  } catch (err) {
    throw err;
  }
}

// 3. Criar Marcação (Adm/Bloqueio)
async function criarMarcacaoAdm({ dia, turno, hora, descricao }) {
  const sql = `
    INSERT INTO marcacoes (dia, turno, hora, descricao) 
    VALUES($1, $2, $3, $4) 
    RETURNING idMarc`;
  
  try {
    const res = await db.query(sql, [dia, turno, hora, descricao]);
    return res.rows[0].idmarc;
  } catch (err) {
    throw err;
  }
}

// 4. Buscar todas as marcações de um dia (Equivalente ao db.all)
async function buscarMarcacao(dia) {
  const sql = `SELECT * FROM marcacoes WHERE dia = $1`;
  
  try {
    const res = await db.query(sql, [dia]);
    // res.rows já é o array com todos os objetos, exatamente o que o Controller espera
    return res.rows;
  } catch (err) {
    throw err;
  }
}

async function apagarMarcacao(id) {
  const sql = `DELETE FROM marcacoes WHERE idMarc = $1`;
  
  try {
    const res = await db.query(sql, [id]);
    return res.rowCount; // Retorna o número de linhas apagadas
  } catch (err) {
    throw err;
  }
}

async function atualizarMarcacao(id, hora, turno, descricao) {
  const sql = `
    UPDATE marcacoes 
    SET hora = $1, turno = $2, descricao = $3 
    WHERE idMarc = $4`;
  
  try {
    const res = await db.query(sql, [hora, turno, descricao, id]);
    return res.rowCount; // Retorna o número de linhas atualizadas
  } catch (err) {
    throw err;
  }
}
module.exports = {
  criarMarcacaoUser,
  buscarMarcacao,
  apagarMarcacao,
  atualizarMarcacao,
  criarMarcacaoAdm,
  verificarDia,
};
