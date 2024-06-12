import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';


import ModalSerie from '../../modal/modalSerie';
import ModalCalendar  from '../../modal/modalCalendar';

import { useTheme } from '../../themes/themeContext'; // Importa o contexto do tema
import { lightTheme, darkTheme } from '../../themes/themes';

export default function HomeScreen() {

  
  // Config de temas (dark ou light)
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const [modalCalendar, setModalCalendar] = useState(false);  // Modal calendario
  const [modalSerie, setModalSerie] = useState(false); //Modal de serie
  const [modalData, setModalData] = useState([]); //Dados da serie

  const [isWithinTolerance, setIsWithinTolerance] = useState(false);
  const targetLocation = { lat: -22.852672105683173, lng: -43.46786505738011 };
  const tolerance = 10; // Tolerância em metros

  // Dados das séries
  const series = [
    { id: 1, name: 'Série A', exercises: [
        { id: 1, name: 'Exercício A1', detail: 'Detalhe do Exercício A1', maquina:'teste' },  
        { id: 2, name: 'Exercício A2', detail: 'Detalhe do Exercício A2', maquina:'teste' }] 
    },
    { id: 2, name: 'Série B', exercises: [
        { id: 3, name: 'Exercício B1', detail: 'Detalhe do Exercício B1', maquina:'teste',carga:'20', repeticao:'20'}, 
        { id: 4, name: 'Exercício B2', detail: 'Detalhe do Exercício B2', maquina:'teste', carga:'20', repeticao:'20' }] 
    },
    { id: 3, name: 'Série C', exercises: [
        { id: 5, name: 'Exercício C1', detail: 'Detalhe do Exercício C1', maquina:'teste',carga:'20', repeticao:'20' }, 
        { id: 6, name: 'Exercício C2', detail: 'Detalhe do Exercício C2', maquina:'teste',carga:'20', repeticao:'20' },
        { id: 6, name: 'Exercício C2', detail: 'Detalhe do Exercício C2', maquina:'teste',carga:'20', repeticao:'20' },
        { id: 6, name: 'Exercício C2', detail: 'Detalhe do Exercício C2', maquina:'teste',carga:'20', repeticao:'20' },
        { id: 6, name: 'Exercício C2', detail: 'Detalhe do Exercício C2', maquina:'teste',carga:'20', repeticao:'20' }] 
    },
  ];

  // Verifica a posição do usuário em relação ao alvo
  useEffect(() => {
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
  //grin-wink

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.rowContainer}>
        <View style={styles.calendarButtonContainer}>
          <Icon name='calendar' size={20} color={currentTheme.icon} onPress={() => setModalCalendar(true)} />
        </View>
        {isWithinTolerance && (
          <View style={{marginStart: 20}}>
            <Text style={[styles.alertText, { color: currentTheme.text }]}>Está na academia?</Text>

            <View style={styles.alertContainer}>
              <Text style={[styles.alertText, { color: currentTheme.text }]}>Marque sua presença !</Text>
              <Icon name='user' size={15} color={currentTheme.icon} />
            </View>
          </View>


        )}
      </View>
 

      <View style={styles.serieContainer}>
        <FlatList
          data={series}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.touchableSerie} onPress={() => handlePress(item.exercises)}>
              <Text style={styles.TouchableText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={[styles.separator, {backgroundColor:currentTheme.text}]}/>}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false} 
        />
      </View>

      <ModalCalendar
        modalCalendar={modalCalendar}
        setModalCalendar = {setModalCalendar}
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
    gap:20,

  },
  serieContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:60,
    marginTop:20

  },
  separator:{
    height: 1,
    marginVertical:60,
    backgroundColor:"black",
  },
  flatListContent: {
    paddingTop: 20,
  },
  
  calendarButtonContainer: {
    marginHorizontal:30, marginTop:25,
  },
  alertContainer:{
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8, 
    marginStart: 10
  },
  rowContainer:{
    flexDirection: 'row-reverse', 
    justifyContent: 'space-between', 
    marginTop: 15, 
    marginBottom: 30
  },
  //Botões
  touchableCalendar: {
    borderRadius: 25,
    borderWidth:1,
    width:40,
    height:40,
    alignItems: 'center',
    justifyContent:'center'

  },
  touchableSerie: {
    borderRadius: 20,
    backgroundColor: '#32CD32',
    padding: 20,
    paddingHorizontal:60,

  },
  //Textos
  TouchableText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0C0F14',//0C0F14
  },
  
  alertText: {
    fontSize: 16,
    marginVertical: 15,
  },
});
