import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Calendario from '../calendar/calendario';
import { saveData, loadData } from '../calendar/storage'
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../themes/themes';
import Icon from 'react-native-vector-icons/FontAwesome6';



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
          <View style={[styles.calendarContainer, {backgroundColor:currentTheme.background, borderColor:currentTheme.separator}]}>
            <Text style={[{marginBottom:20, alignSelf:'center', fontSize:15}, {color:currentTheme.text}]}>
              REGISTRE SUA PRESENÇA !
            </Text>
            <Calendario selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
              
            <TouchableOpacity onPress={() => setModalCalendar(false)} style={[styles.touchableVoltar, {backgroundColor:currentTheme.backgroundAlternativo}]}>
              <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                <Icon name='reply' size={13} color={currentTheme.text} />
                <Text style={[styles.TouchableText, {color:currentTheme.text}]}>VOLTAR</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );};
    export default ModalCalendar

    const styles = StyleSheet.create({
        //Views
        calendarContainer:{
          padding: 50,
          borderRadius: 10, 
          borderWidth: 1,
          gap: 8,
        },
        backgroundCalendarContainer:{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        //Botões
        touchableVoltar: {
          borderRadius: 10,
          padding: 20,
          alignItems: 'center',
          justifyContent:'center'
        },
        //Textos
        TouchableText: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      });