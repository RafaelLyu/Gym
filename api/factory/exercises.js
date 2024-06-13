const express = require("express");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database('database.db');


const exercises = {
    "Parte Superior do Corpo": [
      "Supino reto", "Supino inclinado", "Supino declinado", "Crucifixo", "Fly", "Flexão de braço", "Pullover", "Cross-over",
      "Barra fixa", "Remada com barra", "Remada unilateral com halteres", "Puxada alta", "Puxada frontal", "Puxada na polia baixa", "Remada cavalinho", "Remada sentada",
      "Desenvolvimento com barra", "Desenvolvimento com halteres", "Elevação lateral", "Elevação frontal", "Elevação posterior", "Remada alta", "Desenvolvimento Arnold", "Elevação lateral inclinada",
      "Rosca direta", "Rosca alternada com halteres", "Rosca martelo", "Rosca 21", "Tríceps pulley", "Tríceps testa", "Tríceps coice", "Extensão de tríceps na polia alta", "Flexão de braços diamante", "Rosca inversa", "Flexão de punho", "Extensão de punho"
    ],
    "Parte Inferior do Corpo": [
      "Agachamento livre", "Agachamento na máquina", "Afundo", "Cadeira extensora", "Cadeira flexora", "Levantamento terra", "Passada",
      "Elevação pélvica", "Abdutora", "Adução de quadril", "Agachamento sumô", "Stiff",
      "Panturrilha sentado", "Panturrilha em pé", "Gêmeos na máquina", "Elevação de panturrilha unilateral"
    ],
    "Abdominais": [
      "Crunch abdominal", "Prancha frontal", "Prancha lateral", "Elevação de pernas", "Russian twist", "Prancha com rotação de tronco", "Abdominal remador", "Prancha dinâmica", "Tesoura"
    ],
    "Aeróbicos": [
      "Corrida", "Ciclismo", "Caminhada", "Elíptico", "Pular corda", "Subir escadas"
    ]
  };
  
  function insertExercises() {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        let insertStmt = db.prepare('INSERT INTO exercises (ExerciseName, TargetMuscle) VALUES (?, ?)');
        for (let targetMuscle in exercises) {
          if (exercises.hasOwnProperty(targetMuscle)) {
            exercises[targetMuscle].forEach((exercise) => {
              insertStmt.run(exercise, targetMuscle, (err) => {
                if (err) {
                  console.error(`Erro ao inserir exercício ${exercise}:`, err.message);
                  reject(err);
                } else {
                  console.log(`Exercício ${exercise} inserido com sucesso.`);
                }
              });
            });
          }
        }
        insertStmt.finalize((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  module.exports = {
    insertExercises
  };