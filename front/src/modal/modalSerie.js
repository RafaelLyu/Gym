import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView} from 'react-native';

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
    <View style={[styles.itemContainer, { backgroundColor: currentTheme.backgroundAlternativo }]}>
    <Text style={[styles.itemText, {color:currentTheme.text}]}>{item.exerciseName}</Text>
      {item.TargetMuscle && <Text style={[styles.detailText, {color:currentTheme.text}]}>{item.TargetMuscle}</Text>}
      {item.Sets && <Text style={[styles.detailText, {color:currentTheme.text, marginBottom:15}]}>Repetições: {item.Sets}</Text>}
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
        <View style={[{ flex: 1 }, { backgroundColor: currentTheme.background }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.modalView, { backgroundColor: currentTheme.background }]}>          
        <Text style={styles.modalText}>Exercícios</Text>
          {description && <Text style={[styles.descriptionText, {color:currentTheme.text}]}>{description}</Text>}
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>

          <TouchableOpacity style={styles.voltarTouchable} onPress={() => setModalSerie(false)}>
            <Text style={styles.voltarText}>Fechar</Text>
          </TouchableOpacity>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 15,
    borderRadius: 20,
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 50,
    gap: 10,
    marginHorizontal: 15,
    backgroundColor: '#DCDCDC',
    borderRadius: 20,
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
  descriptionText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  voltarText: {
    fontSize: 16,
    color: '#F0F0F0',
  },
  voltarTouchable: {
    backgroundColor: '#32CD32',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 35,
    paddingVertical: 10,  },
});

export default ModalSerie;