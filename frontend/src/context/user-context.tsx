import { createContext, SetStateAction, useState } from "react";

interface Props {
  children: React.ReactNode;
}

type Current = {
  name: string;   // Username       // Nome do usuario
  email: string;  //User's email    //Email do usuario
  token: string;  //validation token    //Token de validação
};

type Context = {
  currentUser: Current | null;
  setCurrentUser: React.Dispatch<SetStateAction<Current | null>>;
  setToken: (token: string) => void;
  getToken: () => string | null;
};
// Creating Context for user storage, so it can be accessed from all over the application
// Criação de Context para armazenamento de usuario, para que possa ser acessado de toda a aplicação
export const UserContext = createContext<Context>(null!);

// Provider that makes access possible
// Provedor pelo qual acesso é possivel
export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<Current | null>(null);

  // store token in local storage
  // armazena token no local storage
  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  // get token from local storage
  // pega token do local storage
  const getToken = () => {
    const data = localStorage.getItem("authToken");
    return data;
  };

  const value = { currentUser, setCurrentUser, setToken, getToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
