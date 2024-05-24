import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const exercicios = {
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
  ]
};

export default function ExerciciosScreen() {
  const [quantidades, setQuantidades] = useState({});

  const handleInputChange = (exercicio, quantidade) => {
    setQuantidades({ ...quantidades, [exercicio]: quantidade });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(exercicios).map(([parteCorpo, listaExercicios]) => (
        <View key={parteCorpo}>
          <Text style={styles.partTitle}>{parteCorpo}</Text>
          {listaExercicios.map(exercicio => (
            <View key={exercicio} style={styles.exerciseRow}>
              <Text>{exercicio}</Text>
              <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantidades[exercicio]}
                onChangeText={text => handleInputChange(exercicio, text)}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  partTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 'auto',
    width: 100,
  },
});
