import React, { useState } from 'react';
import { View, Image,  Text, StyleSheet, TouchableOpacity,  Switch } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabs from './HomeTabs';
import AvaliacaoScreen from '../views/Avaliacao/avaliacao';
import ExerciciosScreen from '../views/Exercicios/exercicios';
import ContatosScreen from '../views/Contatos/contatos';
import CadastroScreen from '../views/Cadastro/cadastro';
import Icon from 'react-native-vector-icons/FontAwesome';
import {imagePath} from '../../assets/assets';
import {useTheme} from '../themes/themeContext'; // Modo light/dark
import {lightTheme, darkTheme } from '../themes/themes';

import ModalLofoff from '../modal/modalLogoff';

import {useUser} from '../user/user';

const Drawer = createDrawerNavigator();


const icons = {
  Home: 'home',
  'Metas e Avaliação': 'bar-chart-o',
  Exercicios: 'th-list',
  Contatos: 'phone'
};

function CustomDrawerContent(props) {
  const {userNome} =  useUser();
  const [modalLogoff, setModalLogoff] = useState(false); // Modal Logoff

  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;


  return (
    <View style={[styles.drawerContainer, {backgroundColor: currentTheme.background}]}>
      <View style={styles.navagationContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={imagePath}
            style={styles.profilePic}
          />
          <Text style={[styles.navagationText, {color: currentTheme.text}]}>{userName}</Text>
        </View>
        
        <View style={styles.separator} />

        {/*navegação*/}
        {props.state.routes.map((route, index) => (
          <View key={index} style={{marginBottom: 60, flexDirection:'row' }}>
              
            <Icon 
              name={icons[route.name]} 
              size={20}  
              onPress={() => props.navigation.navigate(route.name)} 
              style={[styles.icon, {color:currentTheme.icon}]}
            />

            <Text
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.navagationText, {color: currentTheme.text}]}>
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
          <TouchableOpacity
            onPress={() => setModalLogoff(true)}>
            <Text style={{ color: "red", fontSize: 15 }}>Sair</Text>
          </TouchableOpacity>
          <Icon name='sign-out' size={20} color={'red'} />
        </View>

      </View>
      <ModalLofoff
        modalLogoff={modalLogoff}
        setModalLogoff={setModalLogoff}
      />
    </View>
  );
}

export default function DrawerScreens() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
      <Drawer.Navigator 
        drawerContent={props => <CustomDrawerContent {...props} />} 
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.background, 
              borderBottomWidth:0.5,
              borderBottomColor:'#32CD32'
            },
            headerTitle: () => (
              <Image
                source={require('../../assets/logo.webp')} // Substitua pelo caminho correto da sua logo
                style={styles.logo}
              />
            ),
            headerTitleAlign: 'center',
            headerTintColor: currentTheme.text,
            headerTitleStyle:{
              backgroundColor:'#228B22',
              fontFamily:'Merriweather Regular',
              fontSize:10,
              borderRadius:50,
              padding:8,
              color:'white',
            }
            
          }}
        >
        <Drawer.Screen name="Home" component={HomeTabs}  />
        <Drawer.Screen name="Metas e Avaliação" component={AvaliacaoScreen} />
        <Drawer.Screen name="Exercicios" component={ExerciciosScreen} />
        <Drawer.Screen name="Contatos" component={ContatosScreen} />
        <Drawer.Screen name="Cadastro Aluno" component={CadastroScreen}  />

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
