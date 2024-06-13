import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Calendario from '../calendar/calendario';
import { saveData, loadData } from '../calendar/storage'
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../themes/themes';


const ModalCalendar  = ({modalCalendar, setModalCalendar }) => {

    // Config de temas (dark ou light)
    const { theme } = useTheme();
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;
    const [selectedDates, setSelectedDates] = useState({}); 

    // Carregando datas calendario
     useEffect(() => {
    const loadSavedDates = async () => {
      const savedDates = await loadData('selectedDates');
      if (savedDates) {
        setSelectedDates(savedDates);
      }
    };
    loadSavedDates();
     }, []);

     useEffect(() => {
    saveData('selectedDates', selectedDates);
  }, [selectedDates]);
    return (
        <Modal visible={modalCalendar} animationType="fade" transparent={true} onRequestClose={() => {
          setModalCalendar(!modalCalendar);
        }}>
        <View style={styles.backgroundCalendarContainer}> 
          <View style={[styles.calendarContainer, {backgroundColor:currentTheme.background}]}>
            <Calendario selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
              
            <TouchableOpacity onPress={() => setModalCalendar(false)} style={[styles.touchableVoltar, {backgroundColor:currentTheme.backgroundOposto}]}>
              <Text style={[styles.TouchableText, {color:currentTheme.textOposto}]}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );};
    export default ModalCalendar

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
          flex:0.8,
          justifyContent:'space-evenly',
          alignItems:'center'
      
        },
        //Botões
        touchableCalendar: {
          borderRadius: 25,
          borderWidth:1,
          width:50,
          height:50,
          alignItems: 'center',
          justifyContent:'center'
      
        },
        touchableVoltar: {
          backgroundColor: 'white', 
          borderRadius: 10,
          padding: 20,
          alignItems: 'center'
        },
        touchableSerie:{
          borderRadius: 10,
          backgroundColor:'red',
          padding:20
        },
        //Textos
        TouchableText: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#0C0F14',
        },
      });