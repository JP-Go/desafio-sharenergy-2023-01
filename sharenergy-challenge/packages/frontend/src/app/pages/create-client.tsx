import ClientForm from '../components/Form/ClientForm';
import AuthedPage from './authed-page';
import Header from '../components/Header';
import SnackBar from '../components/SnackBar';
import { FormEvent } from 'react';
import { useClientForm } from '../hooks/use-client-form';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../services/client-api';

export default function CreateClientForm() {
  const navigate = useNavigate();
  const { setMessage, setError, message, error, updateFields, formData } =
    useClientForm();

  function handleBack() {
    navigate('/clients', { replace: true });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const { name, cpf, email, phone, city, cep, state, street, number } =
      formData;
    const data = {
      name,
      cpf,
      email,
      phone,
      address: {
        city,
        cep,
        state,
        street,
        number,
      },
    };
    try {
      await createClient(data);
      setMessage('Realizado com sucesso');
      setTimeout(() => navigate('/clients'), 2500);
    } catch (err: any) {
      const cause =
        typeof err.response.data.message === 'string'
          ? err.response.data.message
          : err.response.data.message[0];
      setError(cause);
    }
  }

  return (
    <AuthedPage>
      <Header path="/clients" />
      <ClientForm
        handleBack={handleBack}
        submit={submit}
        updateFields={updateFields}
      />
      <SnackBar
        message={message}
        variant="warn"
        onClose={() => setMessage('')}
        durationInMs={3000}
        shouldOpen={message !== ''}
      />
      <SnackBar
        message={error}
        variant="error"
        onClose={() => setError('')}
        durationInMs={3000}
        shouldOpen={error !== ''}
      />
    </AuthedPage>
  );
}
