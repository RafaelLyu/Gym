import React from 'react';
import { Modal, View, Text, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


const ModalLofoff = ({ modalLogoff, setModalLogoff }) => {
  return (
    <Modal visible={modalLogoff} animationType="fade" transparent={true} onRequestClose={() => {
      setModalLogoff(!modalLogoff);
    }}>
      <View style={styles.backgroundModalContainer}>
        <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10 }}>
          <Text>Deseja mesmo sair?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setModalLogoff(false)}>
              <Text>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalLogoff(false)}>
              <Text>Sair</Text>
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

  drawerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  navagationContainer: {
    marginTop: 30,
    gap: 10
  },
  backgroundModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  settingsContainer: {
    gap: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8

  },

  // Textos
  settingsText: {
    fontSize: 15,
    textAlign: 'flex-start'
  },
  navagationText: {
    fontSize: 16,

  },
  icon: {
    marginRight: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginVertical: 20,

  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  // Botões

}); 