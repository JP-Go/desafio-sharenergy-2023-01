import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

const Login = () => {
  const { authState, login } = useAuth();

  useEffect(() => {
    if (authState.loggedIn) navigate('/home', { replace: true });
  }, [authState.loggedIn]);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const rememberRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const submitHandle = (e: FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    login(username, password);
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
        <form
          onSubmit={submitHandle}
          className="flex flex-col items-start justify-center gap-4 h-3/5 w-full"
        >
          <label className="font-semibold" htmlFor="username">
            Usuário
          </label>
          <input
            autoFocus
            className="border w-full border-indigo-400 focus:border-indigo-400 rounded p-2"
            type="text"
            name="username"
            ref={usernameRef}
          />
          <label className="font-semibold" htmlFor="password">
            Senha
          </label>
          <input
            className="border w-full border-indigo-400 focus:border-indigo-400 rounded p-2"
            type="password"
            name="password"
            ref={passwordRef}
          />
          <div className="flex gap-2 items-center">
            <input name="remember-me" type="checkbox" ref={rememberRef} />
            <label htmlFor="remember-me">Lembre de mim </label>
          </div>
          <button
            type="submit"
            className="self-center rounded bg-indigo-500 w-full py-2 font-bold text-white mt-4 hover:bg-indigo-700 hover:transition-all duration-300"
          >
            Fazer login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
