const db = require("../databases/db");

async function buscarNomeAdmPorId(id) {
  const sql = `SELECT nome FROM administradores WHERE idadm = $1`;
  
  try {
    const res = await db.query(sql, [id]);
    // res.rows é um array. Se encontrou, retornamos a primeira posição.
    return res.rows[0]; 
  } catch (err) {
    console.error("Erro em buscarNomeAdmPorId:", err);
    throw err;
  }
}

async function findAdmByEmail(email) {
  const sql = `SELECT * FROM administradores WHERE email = $1`;
  
  try {
    const res = await db.query(sql, [email]);
    // Retorna a linha (objeto) ou undefined se não existir
    return res.rows[0]; 
  } catch (err) {
    console.error("Erro em findAdmByEmail:", err);
    throw err;
  }
}

module.exports = {
  buscarNomeAdmPorId,
  findAdmByEmail,
};
