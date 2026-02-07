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

function criarMarcacaoAdm({ dia, turno, hora, descricao }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO marcacoes (dia, turno, hora, descricao) VALUES(?, ?, ?, ?)`,
      [dia, turno, hora, descricao],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
}

function buscarMarcacao(dia) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM marcacoes WHERE dia = ?`, [dia], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function apagarMarcacao(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM marcacoes WHERE idMarc = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
}

function atualizarMarcacao(id, hora, turno, descricao) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE marcacoes SET hora = ?, turno = ?, descricao = ? WHERE idMarc = ?`,
      [hora, turno, descricao, id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      },
    );
  });
}

module.exports = {
  criarMarcacaoUser,
  buscarMarcacao,
  apagarMarcacao,
  atualizarMarcacao,
  criarMarcacaoAdm,
};
