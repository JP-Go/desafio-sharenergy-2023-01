import { HttpClientResponse } from '@sharenergy-challenge/shared-types';
import { FormEvent } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ClientFormData } from '../../@types/form-data';
import { useClientForm } from '../../hooks/use-client-form';
import { patchClient } from '../../services/client-api';
import { filterEmptyFields } from '../../utils/parsers';
import SnackBar from '../SnackBar';

export type EditClientFormProps = {
  client: HttpClientResponse;
};

export default function EditClientForm({ client }: EditClientFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialData = filterEmptyFields({
    ...client,
    ...client.address,
    address: undefined,
  });
  const { error, message, formData, setError, setMessage, updateFields } =
    useClientForm(initialData as ClientFormData);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const updatedData = filterEmptyFields({
      ...formData,
      address: {
        city: formData?.city,
        state: formData?.state,
        cep: formData?.cep,
        number: formData?.number,
        street: formData?.street,
      },
      id: undefined,
    });

    try {
      await patchClient(client.id, updatedData);
      setMessage('Atualizado com sucesso');
      setTimeout(
        () => navigate(`/clients/${client.id}`, { state: { id: client.id } }),
        2200
      );
      queryClient.refetchQueries('get-client');
    } catch (err: any) {
      const cause =
        typeof err.response.data.message === 'string'
          ? err.response.data.message
          : err.response.data.message[0];
      setError(cause);
    }
  }

  return (
    <form onSubmit={submit}>
      <button
        type="button"
        onClick={() =>
          navigate(`/clients/${client.id}`, {
            replace: true,
            state: { id: client.id },
          })
        }
        className="w-fit absolute -top-4 -left-4 bg-indigo-500 text-white p-2 rounded-lg"
      >
        ⬅ Voltar
      </button>
      <button
        type="submit"
        className="w-fit absolute -top-4 -right-4 bg-indigo-500 text-white p-2 rounded-lg"
      >
        Concluir
      </button>
      <div className="w-fit mx-auto">
        <input
          name="clientName"
          className="text-xl outline outline-1 outline-indigo-500 rounded-lg font-bold text-center mt-2 mb-4"
          value={formData.name}
          onChange={(e) => updateFields({ name: e.target.value })}
        />
      </div>
      <div className="p-2">
        <h3 className="font-semibold mb-4">Dados Pessoais</h3>
        <div className="w-2/3 grid grid-cols-2 gap-2 align-center">
          <span>E-mail</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="email"
            value={formData.email}
            onChange={(e) => updateFields({ email: e.target.value })}
          />
          <span>CPF</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="cpf"
            value={formData.cpf}
            onChange={(e) => updateFields({ cpf: e.target.value })}
          />
          <span>Telefone para contato</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="phone"
            value={formData.phone}
            onChange={(e) => updateFields({ phone: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold mb-4">Endereço</h3>
        <div className="w-2/3 grid grid-cols-2 gap-2">
          <span>Rua</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="street"
            value={formData.street}
            onChange={(e) => updateFields({ street: e.target.value })}
          />
          <span>Nº</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="number"
            value={formData.number}
            onChange={(e) => updateFields({ number: e.target.value })}
          />
          <span>Cidade</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="city"
            value={formData.city}
            onChange={(e) => updateFields({ city: e.target.value })}
          />
          <span>Estado</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="state"
            value={formData.state}
            onChange={(e) => updateFields({ state: e.target.value })}
          />
          <span>CEP</span>
          <input
            type="text"
            className="outline outline-1 outline-indigo-500 rounded-lg px-2"
            name="cep"
            value={formData.cep}
            onChange={(e) => updateFields({ cep: e.target.value })}
          />
        </div>
      </div>
      <SnackBar
        message={message}
        shouldOpen={message.length > 0}
        variant="warn"
        onClose={() => setMessage('')}
        durationInMs={2000}
      />
      <SnackBar
        message={error}
        shouldOpen={error.length > 0}
        variant="warn"
        onClose={() => setError('')}
        durationInMs={2000}
      />
    </form>
  );
}
