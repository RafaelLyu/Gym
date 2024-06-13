import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../../user/user'; // Importando o contexto do usuário

import ModalSerie from '../../modal/modalSerie';
import ModalCalendar from '../../modal/modalCalendar';

export default function HomeScreen() {
  const { userToken, userNome, userEmail, userId } = useUser(); // Obtendo dados do usuário do contexto

  const [modalCalendar, setModalCalendar] = useState(false);  // Modal calendário
  const [modalSerie, setModalSerie] = useState(false); // Modal de série
  const [modalData, setModalData] = useState([]); // Dados da série
  const [groupedWorkouts, setGroupedWorkouts] = useState({}); // Dados dos treinos agrupados por nome

  useEffect(() => {
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não encontrado.');
      return;
    }

    fetch(`http://192.168.0.12:8005/api/workoutExercises?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos:', data); // Debug dos dados recebidos
        const groupedData = groupWorkoutsByName(data);
        setGroupedWorkouts(groupedData);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Houve um erro ao buscar os dados dos exercícios do treino');
      });
  }, [userId]);

  // Função para agrupar os treinos pelo nome
  const groupWorkoutsByName = (workouts) => {
    return workouts.reduce((acc, workout) => {
      if (!workout.workoutName) {
        console.error('Workout sem nome:', workout);
        return acc;
      }
      if (!acc[workout.workoutName]) {
        acc[workout.workoutName] = [];
      }
      acc[workout.workoutName].push(workout);
      return acc;
    }, {});
  };

  const handlePress = (exercises) => {
    console.log('Exercícios selecionados:', exercises); // Debug dos exercícios selecionados
    setModalData(exercises);
    setModalSerie(true);
  };

  return (
    <ScrollView style={styles.container}>

      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginHorizontal: 10, marginVertical: 15 }}>
      
        <TouchableOpacity style={styles.touchableCalendar}
          onPress={() => setModalCalendar(true)}>
          <Icon name='calendar' size={20} color='black' />
        </TouchableOpacity>

      </View>
      
      <FlatList
        data={Object.entries(groupedWorkouts)}
        keyExtractor={([workoutName]) => workoutName}
        renderItem={({ item: [workoutName, exercises] }) => (
          <View style={styles.workoutContainer}>
            <TouchableOpacity 
              style={styles.touchableSerie}
              onPress={() => handlePress(exercises)}
            >
              <Text style={styles.TouchableText}>{workoutName}</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      <ModalCalendar
        modalCalendar={modalCalendar}
        setModalCalendar={setModalCalendar}
      />
      
      <ModalSerie
        modalSerie={modalSerie}
        setModalSerie={setModalSerie}
        data={modalData}
      />
      
    </ScrollView>
  );
}

//CSS
const styles = StyleSheet.create({
  //Views
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    gap: 20,
  },
  calendarContainer: {
    backgroundColor: '#0C0F14', 
    padding: 50,
    borderRadius: 10, 
    borderColor: '#FFFFFF', 
    borderWidth: 1,
    gap: 8,
  },
  backgroundCalendarContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  serieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutContainer: {
    margin: 20, // Espaçamento entre os treinos
    alignItems: 'center'
  },
  flatListContent: {
    paddingTop: 20,
  },
  exerciseItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseText: {
    fontSize: 16,
    color: '#333',
  },
  //Botões
  touchableCalendar: {
    borderRadius: 25,
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableVoltar: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  touchableSerie: {
    borderRadius: 15,
    backgroundColor: '#32CD32',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', // Centralizar o texto
    width: "50%"
  },
  //Textos
  TouchableText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0C0F14',
    textAlign: 'center', // Centralizar o texto
  },
});
