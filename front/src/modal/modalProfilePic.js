import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme} from '../themes/themes';
import {useTheme} from '../themes/themeContext';

import foto1 from '../../assets/foto1.png';
import foto2 from '../../assets/foto2.png';
import foto3 from '../../assets/foto3.png';


const ModalProfilePic = ({ modalVisible, setModalVisible, setProfilePic }) => {
  
  const {theme} = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const saveProfilePic = async (newPic) => {
    try {
      await AsyncStorage.setItem('profilePic', JSON.stringify(newPic));
      setProfilePic(newPic);
      setModalVisible(false); 
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
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor:currentTheme.background}]}>
          <Text style={[styles.modalText, {color:currentTheme.text}]}>Escolha uma nova foto de perfil</Text>
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
            style={[styles.button, styles.buttonClose, {backgroundColor:currentTheme.backgroundAlternativo}]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={[styles.textStyle, {color:currentTheme.text}]}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Modal
  modalView: {
    margin: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 10,
    padding:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:15
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  }
});

export default ModalProfilePic;