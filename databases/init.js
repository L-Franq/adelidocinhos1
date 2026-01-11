const db = require("./db");

db.run("PRAGMA foreign_keys = ON");

const tabelas = [
  `CREATE TABLE IF NOT EXISTS usuarios(
    idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    telefone INTEGER UNIQUE NOT NULL,
    senha TEXT NOT NULL)`,

  `CREATE TABLE IF NOT EXISTS administradores(
    idAdm INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    telefone INTEGER UNIQUE NOT NULL,
    senha TEXT NOT NULL)`,

  `CREATE TABLE IF NOT EXISTS marcacoes(
    idMarc INTEGER PRIMARY KEY AUTOINCREMENT,
    dia TEXT NOT NULL,
    hora TEXT NOT NULL,
    turno TEXT,
    lugar TEXT )`,

  `CREATE TABLE IF NOT EXISTS resumos(
    idResumo INTEGER PRIMARY KEY AUTOINCREMENT,
    idMar INTEGER,
    conteudoResumo TEXT,
    FOREIGN KEY (idMar) REFERENCES marcacoes (idMarc))`,
];

db.serialize(() => {
  tabelas.forEach((sql) => {
    db.run(sql);
  });
});

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
