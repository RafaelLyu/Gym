import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../themes/themeContext'; // Modo light/dark
import { lightTheme, darkTheme } from '../../themes/themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { imagePath } from '../../../assets/assets';
import { useUser } from '../../user/user'; // Certifique-se de que o caminho está correto

export default function PerfilScreen() {
  const { userNome, userEmail, userToken, userRole } = useUser();
  // Dados perfil do usuário
  const matricula = '00000000';
  var dataVencimento = '08/06/2024';
  var dataInscricao = '08/06/2024';
  var status = 'Ativo';
  var userNumber = '(21) 9999-8888';

  // Config de temas (dark ou light)
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  // Tela
  return (
    <View style={[styles.viewContainer, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.titleText, { color: currentTheme.text }]}> Meu Perfil </Text>

      <Image source={imagePath} style={styles.profilePic} />

      <Text style={[styles.NameText, { color: currentTheme.text }]}> {userNome}</Text>
      <Text style={[styles.matriculaText, { color: currentTheme.text }]}> Matricula: {matricula}</Text>

      <View style={[styles.infoContainer, { backgroundColor: currentTheme.backgroundInfoContainer, borderColor: currentTheme.borderInfoContainer }]}>
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

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 20, alignItems: 'center' }}>
        <Text style={[styles.matriculaText, { color: currentTheme.text }]}>Alterar Senha</Text>
        <Icon name='lock' size={15} color={currentTheme.text} />
      </View>
    </View>
  );
}

// CSS
const styles = StyleSheet.create({
  // Views
  viewContainer: {
    flexGrow: 1,
    gap: 8,
  },
  infoContainer: {
    flexGrow: 1,
    gap: 12,
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 0.05,
    marginHorizontal: 10,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowColor: '#000',
    elevation: 5,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
  },

  // Textos
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  NameText: {
    fontSize: 19,
    textAlign: 'center',
  },
  matriculaText: {
    fontSize: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
  },

  // Foto
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
});
