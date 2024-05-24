import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';



import HomeScreen from '../views/Home/home';
import PerfilScreen from '../views/Perfil/perfil';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'user' : 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: () => null

      })}
      tabBarOptions={{
        activeTintColor: 'blue', 
        inactiveTintColor: 'gray', 
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false}}/>
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
    
  );
}
