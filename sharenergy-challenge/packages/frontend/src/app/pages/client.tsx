import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import ClientData from '../components/ClientData';
import EditClientForm from '../components/Form/EditClientForm';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { fetchClientData } from '../services/client-api';
import AuthedPage from './authed-page';

export default function Client() {
  const { state, pathname } = useLocation();
  const { id } = state;
  const { data: client, status } = useQuery(
    ['get-client'],
    () => fetchClientData(id),
    { refetchOnMount: true }
  );

  const navigate = useNavigate();

  const onEditMode = pathname.split('/').at(-1) === 'edit';

  function handleEdit(onEditMode: boolean) {
    if (onEditMode) {
      navigate(`/clients/${id}`, { replace: true, state: { id } });
      return;
    }
    navigate('edit', { replace: true, state: { id } });
  }

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
        {!onEditMode && (
          <button
            type="button"
            onClick={() => handleEdit(onEditMode)}
            className="w-fit absolute -top-4 -right-4 bg-indigo-500 text-white p-2 rounded-lg"
          >
            Editar
          </button>
        )}
        <Card className="mt-8 p-8">
          <h1 className="font-bold text-2xl text-center">Dados do cliente</h1>
          {status === 'loading' || !client ? (
            <Spinner />
          ) : !onEditMode ? (
            <ClientData client={client} />
          ) : (
            <EditClientForm client={client} />
          )}
        </Card>
      </main>
    </AuthedPage>
  );
}
