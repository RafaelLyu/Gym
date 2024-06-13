const express = require("express");
const sqlite = require("sqlite3").verbose(); // Importe sqlite3 de forma apropriada
const app = express();
const db = new sqlite.Database('database.db');
app.use(express.json());
const cors = require("cors");
app.use(cors({origin:"*"}))

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roleid INTEGER ,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL UNIQUE,
    data TEXT NOT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (roleid) REFERENCES roles(RoleID)
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela users:', err.message);
    } else {
        console.log('Tabela criada com sucesso users');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS roles (
    RoleID INTEGER PRIMARY KEY AUTOINCREMENT,
    RoleName TEXT NOT NULL UNIQUE
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela roles:', err.message);
    } else {
        console.log('Tabela criada com sucesso roles');
    }
});
db.run(`CREATE TABLE IF NOT EXISTS exercises (
    ExerciseID INTEGER PRIMARY KEY AUTOINCREMENT,
    ExerciseName TEXT NOT NULL,
    TargetMuscle TEXT
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela exercises :', err.message);
    } else {
        console.log('Tabela criada com sucesso exercises');
    }
});


db.run(`CREATE TABLE IF NOT EXISTS workoutExercises   (
    WorkoutExID INTEGER PRIMARY KEY AUTOINCREMENT,
    ExerciseID INTEGER,
    MemberID INTEGER,
    workoutID INTEGER,
    Sets INTEGER NOT NULL,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID)
    FOREIGN KEY (MemberID) REFERENCES users(id)
    FOREIGN KEY (workoutID) REFERENCES workouts(WorkoutID)



)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela workoutExercises :', err.message);
    } else {
        console.log('Tabela criada com sucesso workoutExercises');
    }
});


db.run(`CREATE TABLE IF NOT EXISTS workouts  (
    WorkoutID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT ,
    description TEXT
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela workouts :', err.message);
    } else {
        console.log('Tabela criada com sucesso workouts ');
    }
});



