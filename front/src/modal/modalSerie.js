import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView  , Button} from 'react-native';

import { useTheme } from '../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../themes/themes';

const ModalSerie = ({ modalSerie, setModalSerie, data }) => {
  // Config de temas (dark ou light)
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  // Função para extrair a chave de cada item
  const keyExtractor = (item) => {
    if (!item || !item.WorkoutExID) {
      console.error('Item inválido:', item);
      return 'invalid-key';
    }
    return item.WorkoutExID.toString();
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.exerciseName}</Text>
      {item.TargetMuscle && <Text style={styles.detail}>{item.TargetMuscle}</Text>}
      {item.Sets && <Text style={styles.detail}>Sets: {item.Sets}</Text>}
    </View>
  );
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
  //Textos
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#32CD32',
    borderRadius: 20,
    color: '#F0F0F0',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  detailText: {
    fontSize: 14,
    color: 'gray',
    marginStart: 10,
  },
  closeButton: {
    marginTop: 20,
  },
});

export default ModalSerie;
