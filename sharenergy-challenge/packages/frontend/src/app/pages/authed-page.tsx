import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

interface AuthedPageProps {
  children: ReactNode;
}

export default function AuthedPage({ children }: AuthedPageProps) {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.loggedIn) navigate('/', { replace: true });
  }, [authState.loggedIn]);

  return <>{children}</>;
}
