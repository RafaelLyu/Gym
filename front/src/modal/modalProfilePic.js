import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Atualize a importação do caminho das imagens
import foto1 from '../../assets/foto1.png';
import foto2 from '../../assets/foto2.png';
import foto3 from '../../assets/foto3.png';


const ModalProfilePic = ({ modalVisible, setModalVisible, setProfilePic }) => {
  
  const saveProfilePic = async (newPic) => {
    try {
      await AsyncStorage.setItem('profilePic', JSON.stringify(newPic));
      setProfilePic(newPic);
      setModalVisible(false); // Fecha o modal após salvar a imagem
    } catch (e) {
      console.error('Failed to save profile picture.', e);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Escolha uma nova foto de perfil</Text>
        <Pressable onPress={() => saveProfilePic(foto1)}>
          <Image source={foto1} style={styles.modalImage} />
        </Pressable>
        <Pressable onPress={() => saveProfilePic(foto2)}>
          <Image source={foto2} style={styles.modalImage} />
        </Pressable>
        <Pressable onPress={() => saveProfilePic(foto3)}>
          <Image source={foto3} style={styles.modalImage} />
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Modal
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  }
});

export default ModalProfilePic;
