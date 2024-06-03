import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";


import HomeTabs from './HomeTabs';
import AvaliacaoScreen from '../views/Avaliacao/avaliacao';
import ExerciciosScreen from '../views/Exercicios/exercicios';
import ContatosScreen from '../views/Contatos/contatos';
import CadrastoScreen from '../views/Cadrasto/cadrasto'

const Drawer = createDrawerNavigator();

export default function DrawerScreens() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Avaliação" component={AvaliacaoScreen} />
      <Drawer.Screen name="Exercicios" component={ExerciciosScreen} />
      <Drawer.Screen name="Contatos" component={ContatosScreen} />
      <Drawer.Screen name="Cadastro Aluno" component={CadrastoScreen}  />
    </Drawer.Navigator>
  );
}
