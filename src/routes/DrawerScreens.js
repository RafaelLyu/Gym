import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";


import HomeTabs from './HomeTabs';
import ExerciciosScreen from '../views/Exercicios/exercicios';
import ContatosScreen from '../views/Contatos/contatos';

const Drawer = createDrawerNavigator();

export default function DrawerScreens() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Exercicios" component={ExerciciosScreen} />
      <Drawer.Screen name="Contatos" component={ContatosScreen} />
    </Drawer.Navigator>
  );
}
