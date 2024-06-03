import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ModalSerie from '../../modal/modalSerie';
import ModalCalendar  from '../../modal/modalCalendar';

export default function HomeScreen() {

  const [modalCalendar, setModalCalendar] = useState(false);  // Modal calendario
  const [modalSerie, setModalSerie] = useState(false); //Modal de serie
  const [modalData, setModalData] = useState([]); //Dados da serie

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

  const handlePress = (exercises) => {
    setModalData(exercises);
    setModalSerie(true);
  };

  return (
    <ScrollView style={styles.container}>

      <View style={{justifyContent:'flex-end', alignItems:'flex-end', marginHorizontal:10, marginVertical:15}}>
      
        <TouchableOpacity style={styles.touchableCalendar}
          onPress={() => setModalCalendar(true)}>
          <Icon name='calendar' size={20} color='black'  />
        </TouchableOpacity>

      </View>
      
      <View style={styles.serieContainer}>
        <FlatList
          data={series}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.touchableSerie}
              onPress={() => handlePress(item.exercises)}>
              <Text style={styles.TouchableText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    backgroundColor:'#F0F0F0',
    gap:20,

  },
  calendarContainer:{
    backgroundColor: '#0C0F14', 
    padding: 50,
    borderRadius: 10, 
    borderColor: '#FFFFFF', 
    borderWidth: 1,
    gap: 8,
  },
  backgroundCalendarContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  serieContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },separator: {
    height: 1,
    marginVertical:60,
    backgroundColor:"black",
  },
  flatListContent: {
    paddingTop: 20,
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
  touchableVoltar: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
   touchableSerie: {
    borderRadius: 30,
    backgroundColor: '#32CD32',
    padding: 20,
    paddingHorizontal:60,
    borderWidth:1,
    borderColor:'black'
  },
  //Textos
  TouchableText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0C0F14',
  },
});
