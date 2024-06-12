import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView, Button, CheckBox, Picker, Alert } from 'react-native';
import { useTheme } from '../../themes/themeContext'; // Importe o hook useTheme
import { lightTheme, darkTheme } from '../../themes/themes'; // Importe os temas

const exerciciosPorSerie = {
  "A": {
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
  },
  "B": {
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
  },
  "C": {
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
  },
};

export default function ExerciciosScreen() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const [aluno, setAluno] = useState('');
  const [serie, setSerie] = useState('');
  const [exercicios, setExercicios] = useState({});
  const [quantidades, setQuantidades] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (serie) {
      setExercicios(exerciciosPorSerie[serie]);
    } else {
      setExercicios({});
    }
  }, [serie]);

  const handleInputChange = (exercicio, quantidade) => {
    setQuantidades({ ...quantidades, [exercicio]: quantidade });
  };

  const handleCheckBoxChange = (exercicio, isChecked) => {
    setCheckedItems({ ...checkedItems, [exercicio]: isChecked });
  };

  const handleSubmit = () => {
    const selectedExercises = Object.entries(checkedItems)
      .filter(([exercicio, isChecked]) => isChecked)
      .map(([exercicio]) => ({
        exercicio,
        quantidade: quantidades[exercicio] || '0'
      }));

    const payload = {
      aluno,
      serie,
      selectedExercises
    };

    fetch('https://sua-api.com/exercicios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        Alert.alert('Sucesso', 'Dados enviados com sucesso');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Houve um erro ao enviar os dados');
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.exerciseRow}>
      <CheckBox
        value={!!checkedItems[item]}
        onValueChange={(newValue) => handleCheckBoxChange(item, newValue)}
      />
      <Text style={[styles.exerciseText, { color: currentTheme.text }]}>{item}</Text>
      <TextInput
        style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
        placeholder="Quantidade"
        keyboardType="string"
        value={quantidades[item]}
        onChangeText={text => handleInputChange(item, text)}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContainer, { backgroundColor: currentTheme.background }]}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: currentTheme.text }]}>Nome do Aluno:</Text>
        <TextInput
          style={[styles.textInput, { borderColor: currentTheme.border, color: currentTheme.text }]}
          placeholder="Digite o nome do aluno"
          placeholderTextColor={currentTheme.placeholder}
          value={aluno}
          onChangeText={setAluno}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: currentTheme.text }]}>Selecione a Série:</Text>
        <Picker
          selectedValue={serie}
          style={[styles.picker, { borderColor: currentTheme.border, color: currentTheme.text }]}
          onValueChange={(itemValue) => setSerie(itemValue)}
        >
          <Picker.Item label="Selecione a série" value="" />
          <Picker.Item label="Série A" value="A" />
          <Picker.Item label="Série B" value="B" />
          <Picker.Item label="Série C" value="C" />
        </Picker>
      </View>
      {Object.entries(exercicios).map(([categoria, listaExercicios]) => (
        <View key={categoria} style={styles.listContainer}>
          <Text style={[styles.partTitle, { color: currentTheme.text }]}>{categoria}</Text>
          <FlatList
            data={listaExercicios}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            scrollEnabled={false} // Desabilita a rolagem individual das FlatLists
          />
        </View>
      ))}
      <View style={styles.submitButtonContainer}>
        <Button title="Enviar" onPress={handleSubmit} color={currentTheme.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    height: 40,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  listContainer: {
    marginBottom: 20,
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
  exerciseText: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
    width: 100,
  },
  submitButtonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
});