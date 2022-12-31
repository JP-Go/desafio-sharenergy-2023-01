import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import { AuthContext } from './lib/authContext';
import { useState } from 'react';

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const authState = {
    loggedIn,
    login: (username: string, password: string) => {
      if (username === 'desafiosharenergy' && password === 'sh@r3n3rgy') {
        setLoggedIn(true);
        return true;
      }
      return false;
    },
    logout: () => {
      setLoggedIn(false);
    },
  };
  return (
    <AuthContext.Provider value={authState}>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
