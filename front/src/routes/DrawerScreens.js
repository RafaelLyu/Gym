import React, {useState, useEffect } from 'react';
import {View, Image, Button, Text, StyleSheet, TouchableOpacity, Modal, Switch } from 'react-native';
import { createDrawerNavigator} from "@react-navigation/drawer";
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeTabs from './HomeTabs';
import AvaliacaoScreen from '../views/Avaliacao/avaliacao';
import ExerciciosScreen from '../views/Exercicios/exercicios';
import ContatosScreen from '../views/Contatos/contatos';
import CadastroScreen from '../views/Cadastro/cadastro'
import AlunosScreen from '../views/alunos/aluno';

import Icon from 'react-native-vector-icons/FontAwesome6';
import {useTheme} from '../themes/themeContext'; 
import {lightTheme, darkTheme } from '../themes/themes';

import ModalLofoff from '../modal/modalLogoff';
import ModalProfilePic from '../modal/modalProfilePic'; 

import defaultImage from '../../assets/foto1.png';
import {useUser} from '../user/user';

const Drawer = createDrawerNavigator();


const icons = {
  Home: 'house',
  'Metas e Avaliação': 'medal',
  Exercicios: 'dumbbell',
  Contatos: 'phone',
  'Cadastro Aluno': 'pen-to-square',
  Alunos: 'user-graduate'
};

function CustomDrawerContent(props) {
  const {userNome} = useUser();
  const [modalLogoff, setModalLogoff] = useState(false); 
  
  const [profilePic, setProfilePic] = useState(defaultImage); 
  const [modalVisible, setModalVisible] = useState(false); 


  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    const loadProfilePic = async () => {
      try {
        const savedPic = await AsyncStorage.getItem('profilePic');
        if (savedPic) {
          setProfilePic(JSON.parse(savedPic));
        }
      } catch (e) {
        console.error('Failed to load profile picture.', e);
      }
    };
    loadProfilePic();
  }, []);

  const changeProfilePic = () => {
    setModalVisible(true);
  };

  return (
    <View style={[styles.drawerContainer, { backgroundColor: currentTheme.background }]}>
      <View style={styles.navagationContainer}>
      <View style={styles.rowContainer}>
          <TouchableOpacity onPress={changeProfilePic}>
            <Image source={profilePic} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={[styles.navagationText, { color: currentTheme.text }]}>{userNome}</Text>
        </View>

        <View style={styles.separator} />

        {props.state.routes.map((route, index) => (
          <View key={index} style={{ marginBottom: 60, flexDirection: 'row' }}>
            <Icon
              name={icons[route.name]}
              size={16}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.icon, { color: currentTheme.icon }]}
            />
            <Text
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.navagationText, { color: currentTheme.text }]}
            >
              {route.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.separator} />

        <View style={styles.rowContainer}>
          <Text style={[styles.settingsText, { color: currentTheme.text }]}>Modo escuro</Text>

          <Switch
            trackColor={{ false: '#777', true: '#8bf' }}
            thumbColor={theme === 'light' ? '#fff' : '#7CFC00'}
            value={theme === 'dark'}
            onValueChange={toggleTheme}
          />
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => setModalLogoff(true)}>
            <Text style={{ color: "red", fontSize: 15 }}>Sair</Text>
          </TouchableOpacity>
          <Icon name='arrow-right-from-bracket' size={20} color={'red'} onPress={() => setModalLogoff(true)} />
        </View>
      </View>
      <ModalLofoff modalLogoff={modalLogoff} setModalLogoff={setModalLogoff} />

      <ModalProfilePic
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setProfilePic={setProfilePic}

      />
    </View>
  );
}

export default function DrawerScreens() {
  const { userRole} = useUser();
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
      <Drawer.Navigator 
        drawerContent={props => <CustomDrawerContent {...props} />} 
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.background, 
              borderBottomColor: currentTheme.border,
              borderWidth:0.5
            },
            headerTitle: () => (
              <Image
                source={require('../../assets/logo.webp')} 
                style={styles.logo}
              />
            ),
            headerTitleAlign: 'center',
            headerTintColor: currentTheme.text,
            headerTitleStyle:{
              backgroundColor:'#228B22',
              fontSize:10,
              borderRadius:50,
              padding:8,
              color:'white',
            }
          }}
        >
        {userRole == 1 ?(
          <>
            <Drawer.Screen name="Home" component={HomeTabs}  />
            <Drawer.Screen name="Metas e Avaliação" component={AvaliacaoScreen} />
            <Drawer.Screen name="Contatos" component={ContatosScreen} />
          </>
        ) : (
          <>
          <Drawer.Screen name="Alunos" component={AlunosScreen} />
            <Drawer.Screen name="Exercicios" component={ExerciciosScreen} />
            <Drawer.Screen name="Cadastro Aluno" component={CadastroScreen}  />  
          </>
        )}
      </Drawer.Navigator>
  );
}

// CSS
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
  settingsContainer:{
    gap:20
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
    backgroundColor: '#373737',
    marginVertical: 20, 
    
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  // Botões
  logo:{
    width:100,
    height:100
  }

}); 

