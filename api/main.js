const express = require("express");
const sqlite = require("sqlite3").verbose(); // Importe sqlite3 de forma apropriada
const app = express();
const db = new sqlite.Database('database.db');
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: "*" }));

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Gym'; // Substitua por uma chave segura

// Função para gerar um token
function generateToken(user) {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware para verificar o token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Rota de login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
        if (err || !row) {
            res.status(401).send("Dados inválidos");
        } else {
            const user = { id: row.id, nome: row.nome, email: row.email, roleid: row.roleid };
            const token = generateToken(user);
            res.json({user: user, token: token});
        }
    });
});

app.use('*', authenticateToken);

app.post('/api/cadastro' , (req, res) => {
    console.log(req.body);
    const { nome, email, data, password } = req.body;
    // Preparar a inserção de dados
    const stmt = db.prepare(`INSERT INTO users (nome, email, data, password, roleid) VALUES (?, ?, ?, ?, ?)`);

    // Executar a inserção de dados
    stmt.run(nome, email, data, password, 1, function (err) {
        if (err) {
            console.error('Erro ao inserir usuário:', err.message);
            res.status(500).send('Erro ao cadastrar usuário');
        } else {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).send('Usuário cadastrado com sucesso');
        }
        // Finaliza a declaração após a execução
        stmt.finalize();
    });
});

app.listen(8005, () => console.log("Servidor Ligou na porta 8005"));
