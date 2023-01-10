import { useQuery } from 'react-query';

import Header from '../components/Header';
import AuthedPage from './authed-page';

import { deleteClient, fetchClients } from '../services/client-api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export default function Clients() {
  const { data: clients, refetch } = useQuery(
    'get-clients',
    () => fetchClients(),
    {
      refetchOnMount: true,
    }
  );
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredClients = clients?.filter(({ name }) =>
    name.match(new RegExp(query, 'i'))
  );

  async function deleteClientHandle(e: ButtonClickEvent, id: string) {
    e.stopPropagation();
    await deleteClient(id);
    refetch();
  }

  function editClientHandle(e: ButtonClickEvent, id: string) {
    e.stopPropagation();
    navigate(`/clients/${id}/edit`, { state: { id } });
  }

  return (
    <AuthedPage>
      <Header path="/clients" />
      <h1 className="text-2xl font-bold mx-auto text-center mt-8">Clientes</h1>
      <main className="w-4/5 my-8 mx-auto">
        <div className="mx-auto my-4 flex items-center gap-2">
          <h3 className="w-max font-semibold">Buscar cliente:</h3>
          <input
            className="p-1 rounded-lg outline outline-1 outline-indigo-500"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button
            className="ml-auto bg-indigo-500 text-white p-2 rounded-lg"
            type="button"
            onClick={() => navigate('/clients/new', { replace: true })}
          >
            Adicionar Cliente
          </button>
        </div>
        <table className="table-auto border-collapse w-full mx-auto">
          <thead className="bg-indigo-500 text-white rounded-lg text-lg">
            <tr className="w-full">
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients?.map(({ id, name, phone, email, cpf }) => (
              <tr
                onClick={() => console.log(`redirecting to /clients/${id}`)}
                key={id}
                className="cursor-pointer text-center bg-white border font-normal hover:scale-110 transition-all duration-300"
              >
                <td className="py-2">{name}</td>
                <td className="py-2">{formatPhoneString(phone)}</td>
                <td className="py-2">{email}</td>
                <td className="py-2">{formatCpfString(cpf)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </AuthedPage>
  );
}
