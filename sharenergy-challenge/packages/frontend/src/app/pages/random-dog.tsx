import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AuthedPage from './authed-page';
export default function RandomDog() {
  return (
    <AuthedPage>
      <Header path="/random-dog" />
      <main className="w-4/5 bg-white mx-auto my-8 py-8 px-2 rounded-lg ">
        <h1 className="text-center font-bold text-2xl">Random Dog</h1>
        <h2 className="text-center font-semibold text-xl">
          Clique no botão abaixo para receber uma foto de um dog
        </h2>
        <div className="mx-auto w-fit mt-4">
          <button
            className="h-fit mx-auto rounded-lg px-4 py-2 bg-indigo-500 hover:bg-indigo-600 font-semibold text-white"
            onClick={() => refetch()}
          >
            Quero um Dog!
          </button>
        </div>
      </main>
    </AuthedPage>
  );
}
