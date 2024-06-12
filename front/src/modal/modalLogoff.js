import React from 'react';
import { Modal, View, Text, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../themes/themes';

const ModalLofoff = ({ modalLogoff, setModalLogoff }) => {
  // Config de temas (dark ou light)
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <Modal visible={modalLogoff} animationType="fade" transparent={true} onRequestClose={() => {
      setModalLogoff(!modalLogoff);
    }}>
      <View style={styles.backgroundModalContainer}>
      <View style={[styles.modalContainer, {backgroundColor:currentTheme.background, borderColor:currentTheme.separator}]}>
          <Text style={[styles.text, {color:currentTheme.text}]}>Deseja mesmo sair?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setModalLogoff(false)}>
              <Text style={[{fontSize:15}, {color:currentTheme.text}]}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalLogoff(false)}>
              <Text style={{fontSize:15, color:'red'}}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalLofoff


const styles = StyleSheet.create({
  // Views
  backgroundModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer:{
    padding: 30, 
    borderRadius: 10,
    gap:15,
    borderWidth:0.5
  },
 

  // Textos
  text:{
    fontSize:15,
    textAlign:'center',
    marginBottom:15
  },
  

  // Botões

}); 