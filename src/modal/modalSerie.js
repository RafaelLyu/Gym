import React from 'react';
import { Modal, View, Text, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

const ModalSerie = ({ modalSerie, setModalSerie, data }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalSerie}
      onRequestClose={() => setModalSerie(false)}
    >   <View style={{flex:1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.modalView}>
          <Text style={styles.modalText}>Exercícios</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.item}>{item.name}</Text>
                <Text style={styles.detail}>{item.detail}</Text>
                <Text style={styles.detail}>{item.maquina}</Text>
                <Text style={styles.carga}>Carga: {item.carga}Kg</Text>
                <Text style={styles.carga}>Repetições: {item.repeticao}</Text>


              </View>
            )}
          />
          </ScrollView>
          <Button
            title="Close"
            onPress={() => setModalSerie(false)}
          />
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    flex:1,
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 50,
    gap:10,
    marginStart:15
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: 'gray',
  },
  carga:{
    fontSize:14,
    color:'gray',
    textAlign:'center'
  }
});

export default ModalSerie;
