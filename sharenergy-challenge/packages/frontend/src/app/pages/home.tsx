import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

export default function Home() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState.loggedIn) navigate('/login', { replace: true });
  });
  return <h1>Bem vindo(a) ao site</h1>;
}
