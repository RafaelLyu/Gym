import { createContext, useContext, useState } from 'react';

// criar um contexto psra o estado de autenticação
const AuthContext = createContext();

// Provedor do contexto de autenticação que envolve a árvore de componentes
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLogedIn] = useState(false);

  const login =  async (email , password) => {
    if(email == "admin" && password == "admin"){
      setIsLogedIn(true);
    }
    try{
      const Data = {email , password}
      const res = await fetch("http://192.168.0.12:8005/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
      })
      let resposta = await res.json()
      if (resposta.id){
        setIsLogedIn(true)
      }
    }
    catch(err){
      console.log(err)
    }
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
