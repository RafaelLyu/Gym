import React, {useState} from 'react';
import {View, Image, Button, Text, StyleSheet, TouchableOpacity, Modal, Switch } from 'react-native';
import { createDrawerNavigator} from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';

import HomeTabs from './HomeTabs';
import AvaliacaoScreen from '../views/Avaliacao/avaliacao';
import ExerciciosScreen from '../views/Exercicios/exercicios';
import ContatosScreen from '../views/Contatos/contatos';


import { ThemeProvider } from '../themes/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {imagePath} from '../../assets/assets';
import {userName} from '../../assets/assets';
import {useTheme} from '../themes/ThemeContext'; // Modo light/dark
import {lightTheme, darkTheme } from '../themes/themes';


const Drawer = createDrawerNavigator();

const icons = {
  Home: 'home',
  'Metas e Avaliação': 'bar-chart-o',
  Exercicios: 'th-list',
  Contatos: 'phone'
};

function CustomDrawerContent(props) {
  const [modalLogoff, setModalLogoff] = useState(false); //Modal Logoff

  // Config de temas (dark ou light)
  const {theme, toggleTheme} = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    
      <View style={[styles.drawerContainer, {backgroundColor: currentTheme.background}]}> {/*Drawer*/}
        
        {/*Opções de tela*/}
        <View style={styles.navagationContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={imagePath}
              style={styles.profilePic}
            />
            <Text style={[styles.navagationText, {color: currentTheme.text}]}>{userName}</Text>
          </View>
        
          <View style={styles.separator} />

          {props.state.routes.map((route, index) => (
            <View key={index} style={{marginBottom: 60, flexDirection:'row' }}>
              
              <Icon name={icons[route.name]} size={20}  onPress={() => props.navigation.navigate(route.name)} style={[styles.icon, {color:currentTheme.icon}]} />

              <Text
                onPress={() => props.navigation.navigate(route.name)}
                style={[styles.navagationText, {color: currentTheme.text}]}>
                {route.name}
              </Text>

            </View>
          ))}
        </View>

        {/*Conteudo do Drawer*/}
        <View style={styles.settingsContainer}>
          
          <View style={styles.separator} />

          
          <View style={styles.rowContainer}>
            <Text style={[styles.settingsText, {color: currentTheme.text}]}>Modo escuro</Text>
            
            {/*Switch de tema*/}
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
              <Text style={{color: "red", fontSize: 15}}>Sair</Text>
            </TouchableOpacity>
            <Icon name='sign-out' size={20} color={'red'} />
          </View>

        </View>


        {/*Modal de logoff*/}
        <Modal visible={modalLogoff} animationType="fade" transparent={true}>
          <View style={styles.backgroundModalContainer}> 
            <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 10}}>
              <Text>Deseja mesmo sair?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button onPress={() => setModalLogoff(false)} title="Voltar" />
                <Button onPress={() => setModalLogoff(false)} title="Sair" />
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
}

export default function DrawerScreens() {
  return (
    {/*Navegação*/},
    <ThemeProvider>
      <Drawer.Navigator 
        drawerContent={props => <CustomDrawerContent {...props} />} 
          screenOptions={{
            headerStyle: {
              backgroundColor: 'F0F0F0', 
              borderBottomWidth:1,
              borderBottomColor:'#32CD32'
            },
            headerTitle: 'Like Fitness Gym',
            headerTitleAlign: 'center',
            headerTintColor: '#228B22',
            
          }}
        >
        <Drawer.Screen name="Home" component={HomeTabs}  />
        <Drawer.Screen name="Metas e Avaliação" component={AvaliacaoScreen} />
        <Drawer.Screen name="Exercicios" component={ExerciciosScreen} />
        <Drawer.Screen name="Contatos" component={ContatosScreen} />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}

// CSS
const styles = StyleSheet.create({
  // Views

  drawerContainer: {
    flex: 1, 
    padding: 20, 
    justifyContent:'space-between',
  },
  navagationContainer:{
    marginTop: 30,
    gap: 10
  },
  backgroundModalContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  settingsContainer:{
    gap:20
  },
  rowContainer:{
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    gap:8

  },

  // Textos
  settingsText:{
    fontSize: 15,
    textAlign: 'flex-start'
  },
  navagationText:{
    fontSize: 16,
    
  },
  icon: {
    marginRight: 10,
  },
  separator: {
    height: 1,
    width: '100%', 
    backgroundColor: '#CED0CE',
    marginVertical: 20, 
    
  },
  profilePic: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
  },

  // Botões

});
