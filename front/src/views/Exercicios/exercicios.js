import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, CheckBox } from 'react-native';

export default function ExerciciosScreen() {
  const [aluno, setAluno] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [exercicios, setExercicios] = useState({});
  const [quantidades, setQuantidades] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [memberId, setMemberId] = useState(null); // Inicialmente null
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar a mensagem de erro
  const [successMessage, setSuccessMessage] = useState(''); // Estado para armazenar a mensagem de sucesso

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
    if (text.length > 10) { 
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
      <Text style={styles.exerciseText}>{item.ExerciseName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidades[item.ExerciseName]}
        onChangeText={text => handleInputChange(item.ExerciseName, text)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Aluno:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite o nome do aluno"
            value={aluno}
            onChangeText={handleAlunoChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Treino:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite o nome do treino"
            value={workoutName}
            onChangeText={setWorkoutName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descrição do Treino:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Digite a descrição do treino"
            value={workoutDescription}
            onChangeText={setWorkoutDescription}
          />
        </View>
        <Text style={styles.sectionTitle}>Exercícios</Text>
        <View style={styles.exercisesContainer}>
          <ScrollView contentContainerStyle={styles.exercisesScrollView}>
            {Object.entries(exercicios).map(([categoria, listaExercicios]) => (
              <View key={categoria} style={styles.listContainer}>
                <Text style={styles.partTitle}>{categoria}</Text>
                {listaExercicios.map(renderItem)}
              </View>
            ))}
          </ScrollView>
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
        <View style={styles.submitButtonContainer}>
          <Button title="Submit" onPress={handleSubmit} disabled={!memberId} />
        </View>
      </ScrollView>
    </View>
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exercisesContainer: {
    height: 300, // Ajuste a altura conforme necessário
  },
  exercisesScrollView: {
    paddingVertical: 10,
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
    borderColor: '#ccc',
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
