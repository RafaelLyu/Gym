import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Geolocation from '@react-native-community/geolocation';
import { useUser } from '../../user/user'; 
import ModalSerie from '../../modal/modalSerie';
import ModalCalendar from '../../modal/modalCalendar';
import { useTheme } from '../../themes/themeContext'; 

const lightTheme = {
  background: '#FFFFFF',
  backgroundAlternativo: '#F0F0F0',
  text: '#000000',
  icon: '#000000',
  separator: '#DDDDDD',
};

const darkTheme = {
  background: '#000000',
  backgroundAlternativo: '#303030',
  text: '#FFFFFF',
  icon: '#FFFFFF',
  separator: '#505050',
};

export default function HomeScreen() {
  const { userId } = useUser(); 
  const { theme } = useTheme(); 
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const [modalCalendar, setModalCalendar] = useState(false);  
  const [modalSerie, setModalSerie] = useState(false); 
  const [modalData, setModalData] = useState([]); 
  const [groupedWorkouts, setGroupedWorkouts] = useState({}); 
  const [isWithinTolerance, setIsWithinTolerance] = useState(false); 

  useEffect(() => {
    if (!userId) {
      Alert.alert('Erro', 'ID do usuário não encontrado.');
      return;
    }

    fetch(`http://10.12.156.139:8005/api/workoutExercises?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos:', data); 
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

  useEffect(() => {
    const targetLocation = { lat: -22.852672105683173, lng: -43.46786505738011 };
    const tolerance = 1000000000000000000; // Tolerância em metros

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
    setModalData(exercises);
    setModalSerie(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.rowContainer}>
        <View style={styles.calendarButtonContainer}>
          <Icon name='calendar-days' size={25} color={currentTheme.icon} onPress={() => setModalCalendar(true)} />
        </View>
        {isWithinTolerance && (
          <View style={[styles.presenceContainer, {backgroundColor: currentTheme.backgroundAlternativo}]}>
            <Text style={[styles.alertText, { color: currentTheme.text }]}>Está na academia?</Text>
            <View style={styles.alertContainer}>
              <Text style={[styles.alertText, { color: currentTheme.text }]}>Marque sua presença !</Text>
              <Icon name='face-smile-wink' size={22} color='#000000' style={styles.smileIcon} />
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
            <View style={[styles.separator, {backgroundColor: currentTheme.separator}]} />
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
  presenceContainer: {
    marginStart: 16,
    borderRadius: 10,
  },
  workoutContainer: {
    marginBottom: 20, 
    alignItems: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 20,
  },
  flatListContent: {
    paddingTop: 20,
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
    textAlign: 'center',
  },
  alertText: {
    fontSize: 16,
    marginVertical: 15,
    marginStart: 10,
  },
  smileIcon: {
    marginEnd: 10,
    backgroundColor: 'yellow',
    borderRadius: 50,
  },
});
