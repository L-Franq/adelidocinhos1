const db = require("../databases/db");

function criarMarcacaoUser({ idUsuario, dia, turno, hora, descricao, lugar }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO marcacoes (idUsuario, dia, turno, hora, descricao, lugar) VALUES(?, ?, ?, ?, ?, ?)`,
      [idUsuario, dia, turno, hora, descricao, lugar],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
}

function buscarMarcacao(dia) {
  return new Promise((resolve, reject) => {
    db.run(`SELECT * FROM marcacoes WHERE dia = ?`, [dia], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function apagarMarcacao(id) {
  return new Promise((reject, resolve) => {
    db.run(`DELETE * FROM marcacoes WHERE idMarc = ?`, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

module.exports = { criarMarcacaoUser, buscarMarcacao, apagarMarcacao };
