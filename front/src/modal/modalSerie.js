import React from 'react';
import { Modal, View, Text, Button, FlatList, StyleSheet, ScrollView } from 'react-native';

const ModalSerie = ({ modalSerie, setModalSerie, data }) => {
  // Função para extrair a chave de cada item
  const keyExtractor = (item) => {
    if (!item || !item.WorkoutExID) {
      console.error('Item inválido:', item);
      return 'invalid-key';
    }
    return item.WorkoutExID.toString();
  };

  // Renderização de cada item na lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.exerciseName}</Text>
      {item.TargetMuscle && <Text style={styles.detail}>{item.TargetMuscle}</Text>}
      {item.Sets && <Text style={styles.detail}>Sets: {item.Sets}</Text>}
    </View>
  );

  // Pegar a descrição do primeiro item, assumindo que todos têm a mesma descrição
  const description = data.length > 0 ? data[0].description : '';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalSerie}
      onRequestClose={() => setModalSerie(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Exercícios</Text>
          {description && <Text style={styles.descriptionText}>{description}</Text>}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
          <Button
            title="Fechar"
            onPress={() => setModalSerie(false)}
            style={styles.closeButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%', // Adiciona uma altura máxima para garantir que a rolagem funcione corretamente
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: 'gray',
  },
  closeButton: {
    marginTop: 20,
  },
});

export default ModalSerie;
