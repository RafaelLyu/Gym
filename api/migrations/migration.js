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
    Description TEXT,
    TargetMuscle TEXT,
    EquipmentRequired TEXT

)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela exercises :', err.message);
    } else {
        console.log('Tabela criada com sucesso exercises');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS WorkoutExercises   (
    EntryID INTEGER PRIMARY KEY AUTOINCREMENT,
    WorkoutID INTEGER,
    ExerciseID INTEGER,
    Sets INTEGER NOT NULL,
    Reps INTEGER NOT NULL,
    Weight DECIMAL(5, 2),
    FOREIGN KEY (WorkoutID) REFERENCES MemberWorkouts(WorkoutID),
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID)
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela WorkoutExercises :', err.message);
    } else {
        console.log('Tabela criada com sucesso WorkoutExercises');
    }
});
db.run(`CREATE TABLE IF NOT EXISTS memberWorkouts  (
    WorkoutID INTEGER PRIMARY KEY AUTOINCREMENT,
    MemberID INTEGER,
    TrainerID INTEGER,
    WorkoutName TEXT NOT NULL,
    Date DATE NOT NULL,
    FOREIGN KEY (MemberID) REFERENCES Users(UserID),
    FOREIGN KEY (TrainerID) REFERENCES Users(UserID)
)`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela memberWorkouts :', err.message);
    } else {
        console.log('Tabela criada com sucesso memberWorkouts ');
    }
});

