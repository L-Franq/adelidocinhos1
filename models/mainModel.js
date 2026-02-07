const db = require("../databases/db");

function criarVisitas(nome, email, telefone, mensagem) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO visitantes (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`,
      [nome, email, telefone, mensagem],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
}

module.exports = { criarVisitas };
