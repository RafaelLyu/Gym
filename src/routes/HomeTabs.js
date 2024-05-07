import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from '../pages/Home';
import PerfilScreen from '../pages/Perfil';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
