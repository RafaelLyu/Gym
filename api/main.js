const express = require("express");
const sqlite = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const app = express();
const db = new sqlite.Database('database.db');
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: "*" }));


function generateMatricula() {
    return Math.floor(1000000000 + Math.random() * 9000000000); 
}
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], async (err, row) => {
        if (err || !row) {
            res.status(401).send("Dados inválidos");
        } else {
            const match = await bcrypt.compare(password, row.password);
            if (!match) {
                res.status(401).send("Dados inválidos");
            } else {
                const user = { id: row.id, nome: row.nome, email: row.email, roleid: row.roleid, telefone: row.telefone, matricula: row.matricula };
                res.json({ user: user});
            }
        }
    });
});


app.post('/api/cadastro', async (req, res) => {
    const { nome, email, data, password, telefone, roleid } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const matricula = generateMatricula(); 
    const stmt = db.prepare(`INSERT INTO users (nome, email, data, telefone, password, roleid, matricula) VALUES (?, ?, ?, ?, ?, ?, ?)`);

    stmt.run(nome, email, data, telefone, hashedPassword, roleid, matricula, function (err) {
        if (err) {
            console.error('Erro ao inserir usuário:', err.message);
            res.status(500).send('Erro ao cadastrar usuário');
        } else {
            console.log('Usuário cadastrado com sucesso');
            res.status(200).send('Usuário cadastrado com sucesso');
        }
        stmt.finalize();
    });
});

// Rota para obter exercícios
app.get('/api/exercicios', (req, res) => {
    const sql = 'SELECT * FROM exercises';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send("Erro ao buscar exercícios: " + err.message);
        } else {
            const exercisesByCategory = rows.reduce((acc, row) => {
                if (!acc[row.TargetMuscle]) {
                    acc[row.TargetMuscle] = [];
                }
                acc[row.TargetMuscle].push(row);
                return acc;
            }, {});
            res.json(exercisesByCategory);
        }
    });
});

// Rota para inserir um novo treino
app.post('/api/workouts', (req, res) => {
    const { name, description } = req.body;
    const sql = `INSERT INTO workouts (name, description) VALUES (?, ?)`;
    db.run(sql, [name, description], function(err) {
        if (err) {
            res.status(500).send("Erro ao inserir treino: " + err.message);
        } else {
            res.json({ WorkoutID: this.lastID });
        }
    });
});

// Rota para inserir exercícios em um treino
app.post('/api/workoutExercises', (req, res) => {
    const { ExerciseID, MemberID, workoutID, Sets } = req.body;
    const sql = `INSERT INTO workoutExercises (ExerciseID, MemberID, workoutID, Sets) VALUES (?, ?, ?, ?)`;
    db.run(sql, [ExerciseID, MemberID, workoutID, Sets], function(err) {
        if (err) {
            res.status(500).send("Erro ao inserir exercício no treino: " + err.message);
        } else {
            res.status(200).send('Exercício inserido com sucesso');
        }
    });
});

app.get('/api/aluno', (req, res) => {
    const { nome } = req.query;
    const sql = 'SELECT id FROM users WHERE nome = ?';
    db.get(sql, [nome], (err, row) => {
        if (err || !row) {
            res.status(404).send("Aluno não encontrado");
        } else {
            res.json({ id: row.id });
        }
    });
});

app.get('/api/workoutExercises', (req, res) => {
    const userId = req.query.userId; // Pegando o ID do usuário a partir dos parâmetros da URL
    const sql = `
        SELECT we.WorkoutExID, w.name as workoutName, w.description, e.ExerciseName as exerciseName, e.TargetMuscle, we.Sets
        FROM workoutExercises we
        JOIN workouts w ON w.WorkoutID = we.workoutID
        JOIN exercises e ON e.ExerciseID = we.ExerciseID
        JOIN users m ON m.id = we.MemberID
        WHERE m.id = ?
    `;
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            res.status(500).send("Erro ao buscar exercícios do treino: " + err.message);
        } else {
            res.json(rows);
        }
    });
});

app.get('/api/alunos', (req, res) => {
    const sql = 'SELECT nome, matricula, id FROM users WHERE roleid = 1';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).send("Erro ao buscar alunos: " + err.message);
        } else {
            res.json(rows);
        }
    });
});

app.delete('/api/alunos/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.run(sql, id, function(err) {
        if (err) {
            console.error('Erro ao deletar aluno:', err.message);
            res.status(500).json({ error: 'Erro ao deletar aluno' });
        } else {
            res.status(200).json({ message: 'Aluno deletado com sucesso' });
        }
    });
});



app.listen(8005, () => console.log("Servidor Ligou na porta 8005"));
