// src/user/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../views/Login/AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userNome, setUserNome] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { isLoggedIn } = useAuth(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (userData) {
          if (userData.nome) setUserNome(userData.nome);
          if (userData.email) setUserEmail(userData.email);
          if (userData.roleid) setUserRole(userData.roleid);
        }

        const token = await AsyncStorage.getItem('token');
        if (token) setUserToken(token);
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    } else {
      setUserNome(null);
      setUserEmail(null);
      setUserToken(null);
      setUserRole(null);
    }
  }, [isLoggedIn]); // Dependência no estado de autenticação

  return (
    <UserContext.Provider value={{ userNome, userEmail, userToken, userRole, setUserNome, setUserEmail, setUserToken, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
