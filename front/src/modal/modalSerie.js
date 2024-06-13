import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';

import { useTheme } from '../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../themes/themes';
const ModalSerie = ({ modalSerie, setModalSerie, data }) => {
  
  // Config de temas (dark ou light)
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalSerie}
      onRequestClose={() => setModalSerie(false)}
    >   <View style={[{flex:1}, {backgroundColor:currentTheme.background}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.modalView, {backgroundColor: currentTheme.background}]}>
          <Text style={styles.modalText}>EXERCÍCIOS</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer, {backgroundColor:currentTheme.backgroundAlternativo}]}>
                <Text style={[styles.itemText, {color:currentTheme.text}]}>{item.name}</Text>
                <Text style={[styles.detailText, {color:currentTheme.text}]}>{item.detail}</Text>
                <Text style={[styles.detailText, {color:currentTheme.text}]}>{item.maquina}</Text>
                <Text style={[styles.cargaText, {color:currentTheme.text}]}>Carga: {item.carga}Kg</Text>
                <Text style={[styles.cargaText, {color:currentTheme.text}]}>Repetições: {item.repeticao}</Text>
              </View>
            )}
          />
          </ScrollView>
          <TouchableOpacity onPress={() => setModalSerie(false)} 
          style={styles.voltarTouchable}>
            <Text style={styles.voltarText}>
              VOLTAR
            </Text>
            </TouchableOpacity>

        
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //Views
  modalView: {
    margin: 15,
    borderRadius: 20,
    flex:1,
    
  },
  itemContainer: {
    marginBottom: 50,
    gap:10,
    marginHorizontal:15,
    backgroundColor:'#DCDCDC',
    borderRadius:20,
    
  },
  //Textos
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor:'#32CD32',
    borderRadius:20,
    color:'white',
    paddingVertical:10,
    color:'#F0F0F0'


  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin:10
  },
  detailText: {
    fontSize: 14,
    color: 'gray',
    marginStart:10
  },
  cargaText:{
    fontSize:14,
    color:'gray',
    textAlign:'center'
  },
  voltarText:{
    fontSize: 16,
    color:'#F0F0F0'    
  },
  //Botão
  voltarTouchable:{
    backgroundColor: '#32CD32', 
    borderRadius: 10,
    alignSelf:'center',
    alignItems:'center',
    marginBottom:30,
    paddingHorizontal:35,
    paddingVertical:10
  }
});

export default ModalSerie;