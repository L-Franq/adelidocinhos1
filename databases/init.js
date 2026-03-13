const db = require("./db");

const criarTabelas = async () => {
  const tabelas = [
    `CREATE TABLE IF NOT EXISTS usuarios(
      idUsuario SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      telefone VARCHAR(20) UNIQUE NOT NULL,
      senha varchar(255) NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS administradores(
      idAdm SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      telefone VARCHAR(20) UNIQUE NOT NULL,
      senha varchar(255) NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS marcacoes (
      idMarc SERIAL PRIMARY KEY,
      idUsuario INTEGER REFERENCES usuarios(idUsuario), 
      dia DATE NOT NULL,          
      turno VARCHAR(50) NOT NULL,        
      descricao varchar(1000),
      lugar VARCHAR(255),
      hora TIME,
      status VARCHAR(20) NOT NULL DEFAULT 'ativo',
      criadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS resum(
      idResumo SERIAL PRIMARY KEY,
      idMarc INTEGER REFERENCES marcacoes(idMarc),
      conteudoResumo varchar(500)
    )`,

    `CREATE TABLE IF NOT EXISTS visitantes (
      idVisit SERIAL PRIMARY KEY,
      nome VARCHAR(255),
      email VARCHAR(255),
      telefone VARCHAR(20),
      mensagem varchar(1000)
    )`,
  ];

  try {
    for (let sql of tabelas) {
      await db.query(sql);
      console.log("Tabela processada com sucesso.");
    }
    console.log("Todas as tabelas foram verificadas/criadas!");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err.message);
  }
};

criarTabelas();

/* Como "ver" os dados juntos?
Para exibir o resumo junto com o dia,
 hora e lugar, você usa um comando chamado JOIN na hora de fazer o SELECT,
  e não na criação da tabela:

SELECT 
    m.dia, 
    m.hora, 
    m.lugar, 
    r.conteudo_resumo
FROM resumos r
JOIN marcacoes m ON r.idMar = m.idMarc;

*/
