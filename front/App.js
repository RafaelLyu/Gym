import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import DrawerScreens from './src/routes/DrawerScreens';
import LoginScreen from './src/views/Login/login';
import { AuthProvider, useAuth } from './src/views/Login/AuthContext';
import { UserProvider } from './src/user/user';
import { ThemeProvider } from './src/themes/themeContext';

const Stack = createStackNavigator();

const App = () => {
  const { isLoggedIn } = useAuth();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="Home"
              component={DrawerScreens}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const WrappedApp = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  );
};

// Registra o componente principal do aplicativo com o nome 'main'
AppRegistry.registerComponent('main', () => WrappedApp);

export default WrappedApp;
