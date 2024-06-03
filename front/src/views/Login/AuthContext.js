import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// criar um contexto para o estado de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação que envolve a árvore de componentes
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    if (email === "admin" && password === "admin") {
      setIsLoggedIn(true);
    }
    try {
      const data = { email, password };
      const res = await fetch("http://192.168.0.12:8005/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resposta = await res.json();

      if (!res.ok &&  resposta.token == null) {
        throw new Error("Erro na requisição") 
      };
      setIsLoggedIn(true);

      try {
        const token = resposta.token
        await AsyncStorage.setItem("token" , token);
        await AsyncStorage.setItem("userData", JSON.stringify(resposta.user));
        const storedUserData = await AsyncStorage.getItem("userData");
        console.log(JSON.parse(storedUserData));

      } catch (err) {
        console.log('Erro ao salvar ou recuperar dados do AsyncStorage:', err);
      }
     
    } catch (err) {
      console.log('Erro ao fazer login:', err);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook para consumir o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
