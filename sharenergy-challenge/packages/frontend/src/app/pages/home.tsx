import Header from '../components/Header';
import User, { UserProps } from '../components/User';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext';
import PageCounter from '../components/PageCounter';
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/randomUserApi';

export default function Home() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [users, setUsers] = useState<UserProps[]>();
  const { data, isLoading } = useQuery(
    ['get-users', page, resultsPerPage],
    () => fetchUsers(page, resultsPerPage)
  );

  useEffect(() => {
    if (!authState.loggedIn) navigate('/', { replace: true });
  }, [authState.loggedIn]);

  useEffect(() => {
    setUsers(data);
  }, [data]);

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
        <PageCounter
          page={page}
          prevPageAction={prevPage}
          nextPageAction={nextPage}
        />
        <div className="mx-auto flex flex-col gap-4 mt-4 mb-8">
          {isLoading ? (
            <p className="text-center text-2xl font-bold">Loading...</p>
          ) : (
            users &&
            users!.map((user) => <User key={user.username} {...user} />)
          )}
        </div>
      </main>
    </>
  );
}
