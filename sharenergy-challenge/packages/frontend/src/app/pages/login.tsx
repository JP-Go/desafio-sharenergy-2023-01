import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SnackBar from '../components/SnackBar';
import { useAuth } from '../context/authContext';

const Login = () => {
  const { authState, login } = useAuth();
  const [message, setMessage] = useState('');

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const rememberRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (authState.loggedIn) navigate('/home', { replace: true });
  }, [authState.loggedIn]);

  const submitHandle = (e: FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    login(username, password);

    if (rememberRef?.current?.checked) {
      localStorage.setItem('app-remember-login', 'true');
    }

    if (!authState.loggedIn) {
      setMessage('Credenciais incorretas. Tente novamente.');
    }
  };

  return (
    <div className="mx-auto h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-[640px] text-indigo-700 flex flex-col justify-center items-center px-8 pb-8 rounded-md shadow-2xl gap-8">
        <h1 className="text-center mb-4">
          <p className="text-indigo-700 font-bold text-3xl leading-relaxed">
            Bem vindo
          </p>
          <p>Entre com os dados da sua conta</p>
        </h1>
        <LoginForm
          rememberRef={rememberRef}
          usernameRef={usernameRef}
          passwordRef={passwordRef}
          submitHandle={submitHandle}
        />
      </div>
      <SnackBar
        message={message}
        durationInMs={3000}
        onClose={() => {
          setMessage('');
        }}
        variant="error"
        shouldOpen={message.length > 0 && !authState.loggedIn}
      />
    </div>
  );
};

export default Login;
