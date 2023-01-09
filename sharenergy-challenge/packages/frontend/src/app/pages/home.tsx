import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchUsers } from '../services/random-user-api';

import Header from '../components/Header';
import User, { UserProps } from '../components/User';
import PageCounter from '../components/PageCounter';
import ResultsPerPageControl from '../components/ResultsPerPageControl';
import AuthedPage from './authed-page';
import LoadingUser from '../components/LoadingUser';

export default function Home() {
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const { data, isLoading } = useQuery(
    ['get-users', page, resultsPerPage],
    () => fetchUsers(page, resultsPerPage)
  );

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
    const regex = new RegExp(query, 'i');
    return users.filter(
      ({ fullName, email, username }) =>
        fullName.toLowerCase().match(regex) ||
        email.match(regex) ||
        username.match(regex)
    );
  }

  const filteredUsers: UserProps[] = filterUsers(users, query);

  return (
    <AuthedPage>
      <Header path="/home" />
      <main className="w-4/5 mx-auto mt-8">
        <h1 className="font-bold text-2xl text-center w-full mb-4">Usuários</h1>

        <div className="w-full mb-4 flex items-center justify-center gap-4">
          <span>Busca: </span>
          <input
            className="w-3/5 px-1 py-1 border border-indigo-500 rounded-lg outline-none"
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            autoFocus
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
          {isLoading && !data ? (
            <LoadingUser />
          ) : (
            filteredUsers.map(
              ({ username, pictureUrl, fullName, age, email }) => (
                <User
                  key={username}
                  username={username}
                  pictureUrl={pictureUrl}
                  fullName={fullName}
                  age={age}
                  email={email}
                />
              )
            )
          )}
        </div>

        <PageCounter
          page={page}
          prevPageAction={prevPage}
          nextPageAction={nextPage}
        />
      </main>
    </AuthedPage>
  );
}
