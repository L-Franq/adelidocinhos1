const db = require("../databases/db");

function buscarNomeAdmPorId(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT nome FROM administradores WHERE idAdm = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

function findAdmByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM administradores WHERE email = ?`,
      [email],
      function (err, row) {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

module.exports = {
  buscarNomeAdmPorId,
  findAdmByEmail,
};
