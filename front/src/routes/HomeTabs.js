import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome6';

import HomeScreen from '../views/Home/home';
import PerfilScreen from '../views/Perfil/perfil';
import { useTheme } from '../themes/themeContext'; // Importa o contexto do tema
import { lightTheme, darkTheme } from '../themes/themes';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = 20;

          if (route.name === 'Home') {
            iconName = 'house';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: currentTheme.background,
          borderTopWidth: 1,
          borderTopColor: currentTheme.border,
        },
      })}
      tabBarOptions={{
        activeTintColor: '#32CD32',
        inactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
