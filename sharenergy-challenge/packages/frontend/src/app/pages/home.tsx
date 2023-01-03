import Header from '../components/Header';
import User, { UserProps } from '../components/User';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/authContext';
import PageCounter from '../components/PageCounter';
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/randomUserApi';
import ResultsPerPageControl from '../components/ResultsPerPageControl';

export default function Home() {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const { data, isLoading } = useQuery(
    ['get-users', page, resultsPerPage],
    () => fetchUsers(page, resultsPerPage)
  );

  useEffect(() => {
    if (!authState.loggedIn) navigate('/', { replace: true });
  }, [authState.loggedIn]);

  useEffect(() => {
    setUsers(data ?? []);
  }, [data]);

  function prevPage() {
    if (page !== 1) setPage((v) => v - 1);
    setQuery('');
  }
  function nextPage() {
    setPage((v) => v + 1);
    setQuery('');
  }

  function filterUsers(users: UserProps[], query: string) {
    return users.filter(
      ({ fullName, email, username }) =>
        fullName.toLowerCase().match(query) ||
        email.includes(query) ||
        username.includes(query)
    );
  }

  const filteredUsers: UserProps[] = filterUsers(users, query);

  return (
    <>
      <Header />
      <main className="w-4/5 mx-auto mt-8">
        <h1 className="font-bold text-2xl text-center w-full mb-4">Usuários</h1>

        <div className="w-full mb-4 flex items-center justify-center gap-4">
          <span>Busca: </span>
          <input
            className="w-3/5"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
        </div>
        <div className="w-full flex items-end">
          <PageCounter
            page={page}
            prevPageAction={prevPage}
            nextPageAction={nextPage}
          />
          <div className="ml-auto self-end">
            <ResultsPerPageControl
              resultsPerPage={resultsPerPage}
              setter={setResultsPerPage}
            />
          </div>
        </div>

        <div className="mx-auto flex flex-col gap-4 mt-4 mb-8">
          {isLoading ? (
            <p className="text-center text-2xl font-bold">Loading...</p>
          ) : (
            filteredUsers.map((user) => <User key={user.username} {...user} />)
          )}
        </div>

        <PageCounter
          page={page}
          prevPageAction={prevPage}
          nextPageAction={nextPage}
        />
      </main>
    </>
  );
}
