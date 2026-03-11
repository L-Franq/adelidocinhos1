require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DB_STORAGE,
  password: process.env.DB_PASSWORD,
  port: process.env.SERVER_PORT,
});

db.connect((err, client, release) => {
  if (err) {
    return console.error("Falha ao se conectar com a db: ", err.stack);
  }
  console.log("Conectado ao banco com sucesso!");
  release();
});

module.exports = db;
