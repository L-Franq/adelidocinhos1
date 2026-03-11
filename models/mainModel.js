const db = require("../databases/db");

async function criarVisitas(nome, email, telefone, mensagem) {
  // Adicionamos "RETURNING idVisit" para o Postgres devolver o ID gerado
  const sql = `
    INSERT INTO visitantes (nome, email, telefone, mensagem) 
    VALUES ($1, $2, $3, $4) 
    RETURNING idVisit
  `;
  
  try {
    const res = await db.query(sql, [nome, email, telefone, mensagem]);
    
    // O ID virá na primeira linha do resultado
    // res.rows[0] será algo tipo { idvisit: 1 }
    return res.rows[0].idvisit; 
  } catch (err) {
    console.error("Erro ao criar visita:", err);
    throw err;
  }
}

module.exports = { criarVisitas };
