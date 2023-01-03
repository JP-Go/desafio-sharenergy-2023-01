import { createContext, ReactNode, useContext, useReducer } from 'react';

type AuthState = { loggedIn: boolean };
type AuthActions = { kind: 'login' | 'logout'; args?: AuthData };
type AuthData = { username: string; password: string };
type AuthContextInterface = {
  authState: AuthState;
  login: (username: string, password: string) => void;
  logout: () => void;
};

function reducer(state: AuthState, action: AuthActions) {
  const { kind, args } = action;
  switch (kind) {
    case 'login':
      if (state.loggedIn) {
        return state;
      }
      if (!args) {
        throw 'Login arguments not passed';
      }
      //TODO: Remove dummy credentials
      const { password, username } = args;
      if (username == 'test' && password == 'test')
        return { ...state, loggedIn: true };
      return { ...state, loggedIn: false };
    case 'logout':
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, dispatch] = useReducer(reducer, { loggedIn: false });
  function login(username: string, password: string) {
    dispatch({ kind: 'login', args: { username, password } });
  }
  function logout() {
    dispatch({ kind: 'logout' });
  }
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
