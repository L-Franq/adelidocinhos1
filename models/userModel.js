const db = require("../databases/db");

function criarUser(nome, email, telefone, senhaAsh) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO usuarios(nome, email, telefone, senha) VALUES(?, ?, ?, ?)`,
      [nome, email, telefone, senhaAsh],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function buscarUserPorEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM usuarios WHERE email = ?`,
      [email],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

module.exports = { criarUser, buscarUserPorEmail };
