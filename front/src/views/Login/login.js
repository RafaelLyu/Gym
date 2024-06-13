import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';

const LoginScreen = ({ navigation, route }) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar a mensagem de erro

  const isLoginDisabled = !email || !password;

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage('Login falhou. Verifique seu e-mail e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require("../../../assets/VectorTop.png")} style={styles.topImage} />
      </View>

      <View style={styles.introducao}>
        <Text style={styles.Textintroducao}>Academia</Text>
        <Text style={styles.SubTextintroducao}>Sua Jornada Começa Aqui</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesomeIcon
          icon={faUser}
          size={15}
          color="#BEBEBE"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder='E-mail'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesomeIcon
          icon={faLock}
          size={15}
          color="#BEBEBE"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Senha'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </View>

      <View style={styles.signInButtonContainer}>
        <Button
          style={styles.signInButton}
          title='Entrar'
          onPress={handleLogin}
          disabled={isLoginDisabled}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  topImage: {
    width: "100%",
    height: 180,
  },
  topImageContainer: {},
  introducao: {
    marginBottom: 80,
  },
  Textintroducao: {
    fontSize: 40,
    color: 'black',
    fontWeight: "600",
    letterSpacing: 2.0,
    textAlign: 'center',
  },
  SubTextintroducao: {
    textAlign: 'center',
    fontWeight: "400",
    letterSpacing: 1.5,
    color: "#447da9"
  },
  inputContainer: {
    backgroundColor: '#F8F8FF',
    borderRadius: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    height: 40,
    flex: 1,
    color: "#BEBEBE"
  },
  inputIcon: {
    marginLeft: 10,
    marginRight: 5,
    color: "#BEBEBE"
  },
  forgotPasswordText: {
    textAlign: 'right',
    width: "100%",
    fontSize: 15,
    color: "#BEBEBE",
    paddingRight: 20
  },
  signInButtonContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  signInButton: {
    borderRadius: 20,
    letterSpacing: 2.0,
  },
  SignIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: 'bold',
  },
  BottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  BottomImage: {
    height: 300,
    width: 200
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;
