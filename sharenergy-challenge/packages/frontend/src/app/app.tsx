import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './lib/authContext';
import Home from './pages/home';
import Login from './pages/login';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}
