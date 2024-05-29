// App.js
import React,{} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerScreens from './src/routes/DrawerScreens';
import LoginScreen from './src/views/Login/login';
import { AuthProvider, useAuth } from './src/views/Login/AuthContext';


const Stack = createStackNavigator();

const App = () => {
  
  const { isLoggedIn } = useAuth();
  return (
   
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
  );
};

const WrappedApp = () => {
  return (
      <AuthProvider>
        <App />
      </AuthProvider>
  );
};

export default WrappedApp;
