const express = require("express");
const sqlite = require("sqlite3").verbose(); // Importe sqlite3 de forma apropriada
const app = express();
const db = new sqlite.Database('database.db');
app.use(express.json());
const cors = require("cors");
app.use(cors({origin:"*"}))

// Criar tabela apenas uma vez

app.post('/api/cadrasto', (req, res) => {
    console.log(req.body)
    const {nome, email, data, password } = req.body;

    // Preparar a inserção de dados
    const stmt = db.prepare(`INSERT INTO users (nome, email, data, password , roleid) VALUES (?, ?, ?, ? , ?)`);

    // Executar a inserção de dados
    stmt.run(nome, email, data, password, 1, function(err) {
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

app.post('/api/login' , (req , res) =>{
    const {email , password} = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(sql ,[email , password] , (err, row) => {
        if(err ){
            res.status(401).send("Dados Invalidos")
        } else{
            res.json(row)
        }
    } )

})

app.listen(8005, () => console.log("Servidor Ligou na porta 8005"));