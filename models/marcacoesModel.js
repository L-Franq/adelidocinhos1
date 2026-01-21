const db = require("../databases/db");

function criarMarcacao(dia, turno, hora, descricao, lugar) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO marcacoes (dia, turno, hora, descricao, lugar) VALUES(?, ?, ?, ?)`,
      [dia, turno, hora, descricao, lugar],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
}

module.exports = { criarMarcacao };
