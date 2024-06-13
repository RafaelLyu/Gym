import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../../themes/themes';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function PerfilScreen() {
  const userName = 'Davi Soares da Silva';
  var dataVencimento = '08/06/2024';
  var dataInscricao = '08/06/2024';
  var status = 'Ativo';
  var userNumber = '(21) 9999-8888';
  var userEmail = 'testeteste@gmail.com';

  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <View style={[styles.profileView, { backgroundColor: currentTheme.background }]}>

        <Text style={[styles.titleText, { color: currentTheme.text }]}> Meu Perfil</Text>

        <Text style={[styles.NameText, { color: currentTheme.text }]}>{userName}</Text>

      </View>

      <View style={[styles.infoContainer, { backgroundColor: currentTheme.backgroundAlternativo }]}>
        <Text style={[styles.infoText, { color: currentTheme.text }]}>Data de inscrição - {dataInscricao}</Text>
        <Text style={[styles.infoText, { color: currentTheme.text }]}>Status: {status}</Text>
        <Text style={[styles.infoText, { color: currentTheme.text }]}>Data de Vencimento - {dataVencimento}</Text>

        <View style={styles.rowContainer}>
          <Text style={[styles.infoText, { color: currentTheme.text }]}>Contato: {userNumber} </Text>
          <Icon name='edit' size={20} color={currentTheme.text} />
        </View>

        <View style={styles.rowContainer}>
          <Text style={[styles.infoText, { color: currentTheme.text }]}>E-mail: {userEmail}</Text>
          <Icon name='edit' size={20} color={currentTheme.text} />
        </View>
      </View>

      <View style={[styles.alterarSenhaContainer, { backgroundColor: currentTheme.background }]}>
        <Text style={[styles.infoText, { color: currentTheme.text }]}>Alterar Senha</Text>
        <Icon name='lock' size={15} color={currentTheme.text} />
      </View>
    </ScrollView>
  );
}

// CSS
const styles = StyleSheet.create({
  // Views
  container: {
    flexGrow: 1,
  },
  profileView: {
    alignItems: 'center',
  },
  infoContainer: {
    gap: 50,
    marginTop: 40,
    borderRadius: 30,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingStart: 20,
    paddingVertical: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },
  alterarSenhaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    marginTop: 60,
  },
  // Textos
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 20,
  },
  NameText: {
    fontSize: 20,
    marginTop: 20,
  },
  infoText: {
    fontSize: 15,
  },
  
});
