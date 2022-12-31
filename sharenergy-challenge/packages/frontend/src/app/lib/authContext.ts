import { createContext, useContext } from 'react';

type AuthContextInterface = {
  loggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const authState = {
  loggedIn: false,
  login: (username: string, password: string) => true,
  logout: () => {},
};

const AuthContext = createContext<AuthContextInterface>(authState);

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
