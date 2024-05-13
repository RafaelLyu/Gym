import { createContext, useContext, useState } from 'react';

// criar um contexto psra o estado de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação que envolve a árvore de componentes
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLogedIn] = useState(false);

  const login = () => {
    setIsLogedIn(true);
  };

  const logout = () => {
    setIsLogedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,  login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook para consumir o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
