const db = require("../databases/db");

function criarMarcacaoUser({idUsuario, dia, turno, hora, descricao, lugar}) {
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

module.exports = { criarMarcacaoUser };
