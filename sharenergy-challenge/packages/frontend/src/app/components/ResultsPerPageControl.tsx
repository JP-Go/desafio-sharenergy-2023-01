import { Dispatch, SetStateAction, useRef } from 'react';

interface ResultsPerPageControlProps {
  resultsPerPage: number;
  setter: Dispatch<SetStateAction<number>>;
}

export default function ResultsPerPageControl({
  resultsPerPage,
  setter,
}: ResultsPerPageControlProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <form
      className="w-3/5 flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        setter(Number(inputRef?.current?.value));
      }}
    >
      <p className="font-semibold text-center mb-2">Resultados por Página</p>
      <input
        className="bg-white  w-1/2 text-center rounded-lg p-2"
        ref={inputRef}
        placeholder={resultsPerPage.toString()}
      />
    </form>
  );
}
