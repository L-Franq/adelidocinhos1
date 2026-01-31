const db = require("../databases/db");

function buscarNomeUserPorId(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT nome FROM usuarios WHERE idUsuario = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
}

function criarUser(nome, email, telefone, senhaAsh) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO usuarios (nome, email, telefone, senha) VALUES(?, ?, ?, ?)`,
      [nome, email, telefone, senhaAsh],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
}

function buscarUserPorEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function buscarUser(id, nome) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT idUsuario, nome FROM usuarios  WHERE idUsuario = ?`,
      [id, nome],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
}

function buscarTudoUser() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT idUsuario, nome FROM usuarios`,[],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      },
    );
  });
}

module.exports = {
  criarUser,
  buscarUserPorEmail,
  buscarNomeUserPorId,
  buscarUser,
  buscarTudoUser,
};
