import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView, Button, CheckBox, Picker, Alert } from 'react-native';

export default function ExerciciosScreen() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const [aluno, setAluno] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [exercicios, setExercicios] = useState({});
  const [quantidades, setQuantidades] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [memberId, setMemberId] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 

  useEffect(() => {
    fetch('http://192.168.0.12:8005/api/exercicios', {})
      .then(response => response.json())
      .then(data => {
        setExercicios(data);
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('Houve um erro ao buscar os dados dos exercícios');
      });
  }, []);

  const handleInputChange = (exercicio, quantidade) => {
    setQuantidades({ ...quantidades, [exercicio]: quantidade });
  };

  const handleCheckBoxChange = (exercicio, isChecked) => {
    setCheckedItems({ ...checkedItems, [exercicio]: isChecked });
  };

  const handleAlunoChange = (text) => {
    setAluno(text);
    if (text.length > 2) { // Buscar apenas se o nome tiver mais de 2 caracteres
      fetch(`http://192.168.0.12:8005/api/aluno?nome=${text}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            setMemberId(data.id);
          } else {
            setMemberId(null);
          }
        })
        .catch(error => {
          console.error(error);
          setErrorMessage('Houve um erro ao buscar o ID do aluno');
        });
    } else {
      setMemberId(null);
    }
  };

  const handleSubmit = () => {
    const selectedExercises = Object.entries(checkedItems)
      .filter(([exercicio, isChecked]) => isChecked)
      .map(([exercicio]) => ({
        exercicio,
        quantidade: quantidades[exercicio] || '0'
      }));

    const workoutPayload = {
      name: workoutName,
      description: workoutDescription,
    };

    fetch('http://192.168.0.12:8005/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutPayload),
    })
    .then(response => response.json())
    .then(data => {
      const workoutID = data.WorkoutID; 
      const exerciciosList = Object.values(exercicios).flat();

      const workoutExercisesPayload = selectedExercises.map(ex => {
        const exercise = exerciciosList.find(e => e.ExerciseName === ex.exercicio);
        return {
          ExerciseID: exercise.ExerciseID,
          MemberID: memberId,
          workoutID: workoutID,
          Sets: parseInt(ex.quantidade, 10),
        };
      });

      return Promise.all(workoutExercisesPayload.map(payload =>
        fetch('http://192.168.0.12:8005/api/workoutExercises', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      ));
    })
    .then(() => {
      setSuccessMessage('Os dados foram enviados com sucesso!');
      setErrorMessage(''); // Limpar mensagem de erro em caso de sucesso
      // Limpar inputs sem alterar os estados
      setAluno('');
      setWorkoutName('');
      setWorkoutDescription('');
      setQuantidades({});
      setCheckedItems({});
      setMemberId(null);
    })
    .catch(error => {
      console.error(error);
      setErrorMessage('Houve um erro ao enviar os dados');
    });
  };

  const renderItem = (item) => (
    <View style={styles.exerciseRow} key={item.ExerciseID}>
      <CheckBox
        value={!!checkedItems[item.ExerciseName]}
        onValueChange={(newValue) => handleCheckBoxChange(item.ExerciseName, newValue)}
      />
      <Text style={styles.exerciseText}>{item}</Text>
      <TextInput
        style={[styles.input, { borderColor: currentTheme.border, color: currentTheme.text }]}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidades[item.ExerciseName]}
        onChangeText={text => handleInputChange(item.ExerciseName, text)}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do Aluno:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite o nome do aluno"
          value={aluno}
          onChangeText={setAluno}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecione a Série:</Text>
        <Picker
          selectedValue={serie}
          style={styles.picker}
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
          <Text style={styles.partTitle}>{categoria}</Text>
          <FlatList
            data={listaExercicios}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            scrollEnabled={false} // Desabilita a rolagem individual das FlatLists
          />
        </View>
      ))}
      <View style={styles.submitButtonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
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
    borderColor: '#ccc',
    borderRadius: 5,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
  },
});