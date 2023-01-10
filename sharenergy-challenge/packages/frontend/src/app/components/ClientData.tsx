import { HttpClientResponse } from '@sharenergy-challenge/shared-types';
import { formatCpfString, formatPhoneString } from '../utils/formatters';

export type ClientDataProps = {
  client: HttpClientResponse;
};

export default function ClientData({ client }: ClientDataProps) {
  return (
    <>
      <h2 className="text-xl font-bold text-center mt-2 mb-4">{client.name}</h2>
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
  );
}
