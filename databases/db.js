require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: process.env.DB_URL ? {rejectUnauthorized: false} : false
});

db.connect((err, client, release) => {
  if (err) {
    return console.error("Falha ao se conectar com a db: ", err.stack);
  }
  console.log("Conectado ao banco com sucesso!");
  release();
});

module.exports = db;
