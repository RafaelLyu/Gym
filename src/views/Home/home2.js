import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Animated, ScrollView, Image, Button, TouchableOpacity, Modal} from 'react-native';

import Calendario from '../Home/calendario';
import {saveData, loadData } from '../Home/storage';

// Função para renderizar a tabela
const TabelaScreen = ({ tabelaData, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  const handleClose = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start(() => {
      onClose();
    });
  };

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <View style={styles.tabelaContainer}>
        <View style={styles.tabelaHeaderRow}>
          <Text style={styles.tabelaHeaderCell}>Exercício</Text>
          <Text style={styles.tabelaHeaderCell}>Repetições</Text>
        </View>
        {tabelaData.map((item, index) => (
          <View key={index} style={styles.tabelaDataRow}>
            <Text style={styles.tabelaDataCell}>{item.exercicio}</Text>
            <Text style={styles.tabelaDataCell}>{item.repeticoes}</Text>
          </View>
        ))}
      </View>
      <TouchableHighlight onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableHighlight>
    </Animated.View>
  );
};



export default function HomeScreen() {

  const [modalCalendar, setModalCalendar] = useState(false);  // Modal calendario
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

  // Estado local para controlar a visibilidade de cada tabela
  const [tabelasVisiveis, setTabelasVisiveis] = useState({ 1: false, 2: false, 3: false });

  // Dados das tabelas para cada série
  const tabelas = {
    1: [
      { exercicio: 'Flexões', repeticoes: 10 },
      { exercicio: 'Abdominais', repeticoes: 15 },
      { exercicio: 'Agachamentos', repeticoes: 20 },
    ],
    2: [
      { exercicio: 'Supino', repeticoes: 12 },
      { exercicio: 'Remada', repeticoes: 18 },
      { exercicio: 'Levantamento Terra', repeticoes: 24 },
    ],
    3: [
      { exercicio: 'Rosca Direta', repeticoes: 8 },
      { exercicio: 'Tríceps Pulley', repeticoes: 14 },
      { exercicio: 'Elevação Lateral', repeticoes: 18 },
    ],
  };

  // Função para lidar com cliques nos botões
  const handleClick = (serie) => {
    console.log(`Você clicou na série ${serie}`);
    // Atualiza o estado para mostrar ou ocultar a tabela e definir a série selecionada
    setTabelasVisiveis(prevState => ({ ...prevState, [serie]: !prevState[serie] }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Treinos</Text>
      {/* Renderizar os botões e tabelas */}
      <ScrollView style={styles.scrollView}>
        {[1, 2, 3].map((serie) => (
          <View key={serie} style={styles.bloco}>
            <TouchableHighlight style={styles.button} onPress={() => handleClick(serie)}>
              <Text style={styles.buttonText}>Série {serie}</Text>
            </TouchableHighlight>
            {tabelasVisiveis[serie] && (
              <TabelaScreen tabelaData={tabelas[serie]} onClose={() => handleClick(serie)} />
            )}
          </View>
        ))}
      </ScrollView>
      


      <TouchableOpacity style={styles.touchableCalendar}
          onPress={() => setModalCalendar(true)}>
          <Text style={styles.TouchableText}>Registrar Frequência</Text>
        </TouchableOpacity>
        
        <Modal visible={modalCalendar} animationType="fade" transparent={true}>
          <View 
            style={styles.backgroundModalContainer}> 
            <View style={styles.calendarContainer}>

              <Calendario selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
              
              <TouchableOpacity onPress={() => setModalCalendar(false)} style={styles.touchableVoltar}>
                <Text style={styles.TouchableText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      
    </View>
  );
}
//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // fundo branco
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: '#000000', // cor preta
  },
  scrollView: {
    width: '80%',
  },
  bloco: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
  tabelaContainer: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  tabelaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tabelaHeaderCell: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  tabelaDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabelaDataCell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  rodape: {
    padding: 10,
    width: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  
  calendarContainer:{
    backgroundColor: '#0C0F14', 
    padding: 50,
    borderRadius: 10, 
    borderColor: '#FFFFFF', 
    borderWidth: 1,
    gap: 8
  },
  backgroundModalContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  touchableCalendar: {
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20
  },
  touchableVoltar: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  TouchableText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '0C0F14',
  },
});
