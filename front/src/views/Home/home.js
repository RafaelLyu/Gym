import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import { useUser } from '../../user/user'; // Importando o contexto do usuário


import ModalSerie from '../../modal/modalSerie';
import ModalCalendar from '../../modal/modalCalendar';
import { useTheme } from '../../themes/themeContext'; // Importa o contexto do tema

export default function HomeScreen() {
  const { userId } = useUser(); // Obtendo dados do usuário do contexto
  const { theme: currentTheme } = useTheme(); // Obtendo o tema atual e garantindo que está sendo usado corretamente
  const [modalCalendar, setModalCalendar] = useState(false);  // Modal calendário
  const [modalSerie, setModalSerie] = useState(false); // Modal de série
  const [modalData, setModalData] = useState([]); // Dados da série
  const [groupedWorkouts, setGroupedWorkouts] = useState({}); // Dados dos treinos agrupados por nome
  const [isWithinTolerance, setIsWithinTolerance] = useState(false); // Estado 

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

  const targetLocation = { lat: -22.852672105683173, lng: -43.46786505738011 };
  const tolerance = 1000000; // Tolerância em metros


  useEffect(() => {
    const targetLocation = { lat: -23.55052, lng: -46.633308 }; // Substitua com as coordenadas de destino
    const tolerance = 50; // Tolerância em metros

    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (isWithinTargetLocation(latitude, longitude, targetLocation, tolerance)) {
          setIsWithinTolerance(true);
        } else {
          setIsWithinTolerance(false);
        }
      },
      error => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, distanceFilter: 1, interval: 5000 }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const isWithinTargetLocation = (lat, lng, target, tolerance) => {
    const distance = getDistanceFromLatLonInMeters(lat, lng, target.lat, target.lng);
    return distance <= tolerance;
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distância em metros
  };

  const handlePress = (exercises) => {
    console.log('Exercícios selecionados:', exercises); // Debug dos exercícios selecionados
    setModalData(exercises);
    setModalSerie(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.rowContainer}>
        <View style={styles.calendarButtonContainer}>
          <Icon name='calendar' size={25} color={currentTheme.icon} onPress={() => setModalCalendar(true)} />
        </View>
        {isWithinTolerance && (
          <View style={[{marginStart: 16, borderRadius:10,}, {backgroundColor:currentTheme.backgroundAlternativo}]}>
            <Text style={[styles.alertText, { color: currentTheme.text }]}>Está na academia?</Text>

            <View style={styles.alertContainer}>
              <Text style={[styles.alertText, { color: currentTheme.text }]}>Marque sua presença !</Text>
              <Icon name='face-smile-wink' size={22} color='#000000' style={{marginEnd:10, backgroundColor:'yellow', borderRadius:500}}/>
            </View>

          </View>
        )}
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
            <View style={styles.separator} />
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

const styles = StyleSheet.create({
  //Views
  container: {
    flex: 1,
    gap: 20,
  },
  rowContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 30,
  },
  calendarButtonContainer: {
    marginHorizontal: 30,
    marginTop: 25,
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginStart: 10,
  },
  serieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
  },
  workoutContainer: {
    marginBottom: 20, 
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 20,
  },
  flatListContent: {
    paddingTop: 20,
  },

  touchableCalendar: {
    borderRadius: 25,
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableSerie: {
    borderRadius: 20,
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', 
    width: "50%",
  },

  TouchableText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0C0F14',
    textAlign: 'center', // Centralizar o texto
  },
  alertText: {
    fontSize: 16,
    marginVertical: 15,
    marginStart: 10

  },
});


