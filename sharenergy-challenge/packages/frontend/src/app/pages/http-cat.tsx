import { useRef, useState } from 'react';
import Header from '../components/Header';
import AuthedPage from './authed-page';

export default function HttpCat() {
  const [code, setCode] = useState(200);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <AuthedPage>
      <Header />
      <div className="w-4/5 bg-white mx-auto flex flex-col items-center justify-center my-8 py-8 px-2 rounded-lg">
        <h1 className="font-bold text-1xl">
          HTTP Cats: Digite um código HTTP e receba um meme de gato
        </h1>
        <div className="h-8 flex items-center justify-center gap-2 mt-4">
          <span className="h-full font-semibold text-center">Código HTTP:</span>
          <input
            type="text"
            className="p-2 h-full outline-none border border-indigo-500 rounded"
            placeholder="200"
            ref={inputRef}
          />
          <button
            onClick={() => setCode(Number(inputRef?.current?.value))}
            className="h-full rounded-lg px-4 bg-indigo-500 hover:bg-indigo-600 font-semibold text-white"
          >
            Meow!
          </button>
        </div>
        <img
          className="w-3/4 mt-8"
          src={`https://http.cat/${code}`}
          alt={`Cat code: ${code}`}
        />
      </div>
    </AuthedPage>
  );
}
