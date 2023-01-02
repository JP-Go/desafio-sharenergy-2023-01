export interface PageCounterProps {
  page: number;
  nextPageAction: () => void;
  prevPageAction: () => void;
}

export default function pageCounter({
  page,
  prevPageAction,
  nextPageAction,
}: PageCounterProps) {
  return (
    <div className="w-1/5">
      <p className="font-semibold text-center mb-2">Página</p>
      <div className="bg-white w-full grid grid-cols-3 place-content-center place-items-center rounded-lg p-2">
        <button
          className="w-4/5 h-full text-white bg-indigo-500 rounded-lg"
          onClick={prevPageAction}
        >
          {'<'}
        </button>
        <span>{page}</span>
        <button
          className="w-4/5 h-full text-white bg-indigo-500 rounded-lg"
          onClick={nextPageAction}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
