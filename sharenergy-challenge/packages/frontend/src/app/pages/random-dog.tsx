import { useQuery } from 'react-query';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { fetchDog } from '../services/random-dog';
import AuthedPage from './authed-page';

export default function RandomDog() {
  const { data, refetch, isLoading, isRefetching } = useQuery(
    'random-dog',
    () => fetchDog()
  );

  function decideContentTypeFromUrl(
    dataUrl: string,
    imgTypes: string[] = ['jpg', 'jpeg', 'png', 'gif', 'svg']
  ): 'image' | 'video' {
    const extension = dataUrl?.split('.').at(-1);
    console.log(extension);
    return imgTypes.some((item) => item === extension?.toLowerCase())
      ? 'image'
      : 'video';
  }

  const contentType = decideContentTypeFromUrl(data ? data : '.img');

  console.log(contentType);

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
            Quero um Dog 🐶!
          </button>
        </div>
        <div className="mx-auto w-3/4 h-3/4 mt-8 rounded-lg">
          {isLoading || isRefetching ? (
            <Spinner />
          ) : contentType === 'image' ? (
            <img
              className="w-1/2 h-1/2 mx-auto object-scale-down"
              width={400}
              height={300}
              src={data}
              alt={'Random Dog'}
            />
          ) : (
            <video
              className="w-1/2 h-1/2 mx-auto"
              width={400}
              height={300}
              src={data}
              controls
              autoPlay
            />
          )}
        </div>
      </main>
    </AuthedPage>
  );
}
