const express = require("express");
const sqlite = require("sqlite3").verbose(); // Importe sqlite3 de forma apropriada
const app = express();
const db = new sqlite.Database('database.db');
app.use(express.json());
const cors = require("cors");
app.use(cors({origin:"*"}))

db.run(`INSERT INTO roles (RoleName) VALUES ("Aluno")
`, (err) => {
    if (err) {
        console.error('Erro ao dar insert in roles:', err.message);
    } else {
        console.log('Insert dado com sucesso in roles');
    }
});
db.run(`INSERT INTO roles (RoleName) VALUES ("Professor")
`, (err) => {
    if (err) {
        console.error('Erro ao dar insert in roles:', err.message);
    } else {
        console.log('Insert dado com sucesso in roles');
    }
});