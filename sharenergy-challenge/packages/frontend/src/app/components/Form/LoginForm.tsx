import { FormEventHandler, Ref } from 'react';

interface LoginFormProps {
  submitHandle: FormEventHandler;
  usernameRef: Ref<HTMLInputElement>;
  passwordRef: Ref<HTMLInputElement>;
  rememberRef: Ref<HTMLInputElement>;
}

export default function LoginForm({
  submitHandle,
  usernameRef,
  passwordRef,
  rememberRef,
}: LoginFormProps) {
  return (
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
  );
}
