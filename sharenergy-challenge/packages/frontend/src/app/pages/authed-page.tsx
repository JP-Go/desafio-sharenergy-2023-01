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
    console.log(authState.loggedIn);
    const notLoggedIn = !authState.loggedIn;
    if (notLoggedIn) navigate('/', { replace: true });
  }, [authState.loggedIn]);

  return <>{children}</>;
}
