const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DB_STORAGE || "./database.db", (err) => {
  if (err) console.log("Erro ao se conectar", err.message);
  else console.log("Conectado com sucesso");
});

module.exports = db;
