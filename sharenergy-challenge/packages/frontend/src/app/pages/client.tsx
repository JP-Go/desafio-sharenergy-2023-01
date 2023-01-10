import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { fetchClientData } from '../services/client-api';
import { formatCpfString, formatPhoneString } from '../utils/formatters';
import AuthedPage from './authed-page';

export default function Client() {
  const { state } = useLocation();
  const { id } = state;
  const { data: client, status } = useQuery(
    ['get-client'],
    () => fetchClientData(id),
    { refetchOnMount: true }
  );

  const navigate = useNavigate();

  return (
    <AuthedPage>
      <Header path="/clients" />
      <main className="relative w-4/5 mx-auto">
        <button
          type="button"
          onClick={() => navigate('/clients', { replace: true })}
          className="w-fit absolute -top-4 -left-4 bg-indigo-500 text-white p-2 rounded-lg"
        >
          ⬅ Voltar
        </button>
        <button
          type="button"
          onClick={() => navigate(`clients/${id}/edit`, { replace: true })}
          className="w-fit absolute -top-4 -right-4 bg-indigo-500 text-white p-2 rounded-lg"
        >
          Editar
        </button>
        <Card className="mt-8 p-8">
          <h1 className="font-bold text-2xl text-center">Dados do cliente</h1>
          {status === 'loading' || !client ? (
            <Spinner />
          ) : (
            <>
              <h2 className="text-xl font-bold text-center mt-2 mb-4">
                {client.name}
              </h2>
              <div className="p-2">
                <h3 className="font-semibold mb-4">Dados Pessoais</h3>
                <div className="w-2/3 grid grid-cols-2 gap-2">
                  <span>E-mail</span> <span>{client.email}</span>
                  <span>CPF</span> <span>{formatCpfString(client.cpf)}</span>
                  <span>Telefone para contato</span>
                  <span>{formatPhoneString(client.phone)}</span>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Endereço</h3>
                <div className="w-2/3 grid grid-cols-2 gap-2">
                  <span>Rua</span> <span>{client.address.street}</span>
                  <span>Nº</span> <span>{client.address.number}</span>
                  <span>Cidade</span> <span>{client.address.city}</span>
                  <span>Estado</span> <span>{client.address.state}</span>
                  <span>CEP</span>
                  <span>{client.address.cep}</span>
                </div>
              </div>
            </>
          )}
        </Card>
      </main>
    </AuthedPage>
  );
}
