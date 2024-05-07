import { createContext, useContext, useState } from 'react';

// criar um contexto psra o estado de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação que envolve a árvore de componentes
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook para consumir o contexto de autwnticação
export const useAuth = () => useContext(AuthContext);
