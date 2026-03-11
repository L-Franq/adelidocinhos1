const db = require("../databases/db");

async function buscarNomeUserPorId(id) {
  const sql = `SELECT nome FROM usuarios WHERE idusuario = $1`;
  try {
    const res = await db.query(sql, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

async function criarUser(nome, email, telefone, senhaAsh) {
  const sql = `
    INSERT INTO usuarios (nome, email, telefone, senha) 
    VALUES($1, $2, $3, $4) 
    RETURNING idUsuario`;
  try {
    const res = await db.query(sql, [nome, email, telefone, senhaAsh]);
    return res.rows[0].idusuario;
  } catch (err) {
    throw err;
  }
}

async function buscarUserPorEmail(email) {
  const sql = `SELECT * FROM usuarios WHERE email = $1`;
  try {
    const res = await db.query(sql, [email]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

async function buscarUser(id, nome) {
  const sql = `SELECT idusuario, nome FROM usuarios WHERE idusuario = $1 AND nome = $2`;
  try {
    const res = await db.query(sql, [id, nome]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

async function buscarTudoUser() {
  const sql = `SELECT idusuario, nome FROM usuarios`;
  try {
    const res = await db.query(sql);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

async function deletarUsuario(id) {
  const sql = `DELETE FROM usuarios WHERE idusuario = $1`;
  try {
    const res = await db.query(sql, [id]);
    return res.rowCount;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  criarUser,
  buscarUserPorEmail,
  buscarNomeUserPorId,
  buscarUser,
  buscarTudoUser,
  deletarUsuario,
};
