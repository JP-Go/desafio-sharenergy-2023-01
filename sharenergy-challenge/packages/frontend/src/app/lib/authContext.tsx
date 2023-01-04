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
      if (username == 'test' && password == 'test') {
        return { ...state, loggedIn: true };
      }
      return { ...state, loggedIn: false };
    case 'logout':
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  function checkBrowserStorage() {
    const localStorageCheck =
      localStorage.getItem('app-remember-login') !== null;
    const sessionStorageCheck = sessionStorage.getItem('app-loggedin') !== null;

    if (localStorageCheck) {
      return true;
    }
    return sessionStorageCheck;
  }

  const [authState, dispatch] = useReducer(reducer, {
    loggedIn: checkBrowserStorage(),
  });

  function login(username: string, password: string) {
    dispatch({ kind: 'login', args: { username, password } });
    sessionStorage.setItem('app-loggedin', 'true');
  }
  function logout() {
    dispatch({ kind: 'logout' });
    sessionStorage.removeItem('app-loggedin');
    localStorage.removeItem('app-remember-login');
  }
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext) as AuthContextInterface;
