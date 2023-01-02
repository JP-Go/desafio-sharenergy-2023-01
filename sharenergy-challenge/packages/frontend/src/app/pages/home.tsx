import Header from '../components/Header';
import User, { UserProps } from '../components/User';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext';

export default function Home() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserProps[] | null>(null);

  async function fetchUsers() {
    const users = await (
      await fetch(`http://localhost:3333/api/user?page=${page}`)
    ).json();
    setUsers(() => users);
  }

  useEffect(() => {
    if (!authState.loggedIn) navigate('/', { replace: true });
  }, [authState.loggedIn]);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  function prevPage() {
    if (page !== 1) setPage((v) => v - 1);
  }
  function nextPage() {
    setPage((v) => v + 1);
  }

  return (
    <>
      <Header />
      <main className="w-4/5 mx-auto mt-8">
        <h1 className="font-bold text-2xl text-center w-full mb-4">Usuários</h1>
        <div className="w-1/5">
          <p className="font-semibold text-center mb-2">Página</p>
          <div className="bg-white w-full grid grid-cols-3 place-content-center place-items-center rounded-lg p-2">
            <button
              className="w-4/5 h-full text-white bg-indigo-500 rounded-lg"
              onClick={prevPage}
            >
              {'<'}
            </button>
            <span>{page}</span>
            <button
              className="w-4/5 h-full text-white bg-indigo-500 rounded-lg"
              onClick={nextPage}
            >
              {'>'}
            </button>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-4 mt-4">
          {users!.map((user) => (
            <User key={user.username} {...user} />
          ))}
        </div>
      </main>
    </>
  );
}
