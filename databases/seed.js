require("dotenv").config({ path: "../.env" });
const db = require("./db");

async function semearAdm() {
  const nome = "Adelia Calala";
  const email = "calala@gmail.com"; 
  const telefone = process.env.PHONE_NUMBER;     
  const senhaPlana = process.env.DB_PASSWORD;
  
  try {
    const sql = `
      INSERT INTO administradores (nome, email, telefone, senha)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING;
    `;

    const res = await db.query(sql, [nome, email, telefone, senhaPlana]);

    if (res.rowCount > 0) {
      console.log("Administrador inicial criado com sucesso!");
    } else {
      console.log("O administrador já existe na base de dados.");
    }

  } catch (err) {
    console.error("Erro ao inserir no Postgres:", err);
  } finally {
    process.exit(); 
  }
}

semearAdm();