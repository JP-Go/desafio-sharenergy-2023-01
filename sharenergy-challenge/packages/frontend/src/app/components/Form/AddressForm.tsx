import { useState } from 'react';
import { ClientFormData } from '../../@types/form-data';
import { formatCepString, formatCpfString } from '../../utils/formatters';

interface AddressFormProps {
  updateField: (fields: Partial<ClientFormData>) => void;
}

export default function ClientDataForm({ updateField }: AddressFormProps) {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');

  return (
    <div>
      <h2 className="font-bold text-lg">Dados de endereço</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="state" className="py-2">
          Estado:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="state"
          value={state}
          placeholder="Estado"
          onChange={(e) => {
            setState(e.target.value);
            updateField({ state: e.target.value });
          }}
        />
        <label htmlFor="city" className="py-2">
          Cidade:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="city"
          value={city}
          placeholder="Cidade"
          onChange={(e) => {
            setCity(e.target.value);
            updateField({ city: e.target.value });
          }}
        />
        <label htmlFor="street" className="py-2">
          Rua:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          value={street}
          name="street"
          placeholder="Rua, Avenida"
          onChange={(e) => {
            setStreet(e.target.value);
            updateField({ street: e.target.value });
          }}
        />
        <label htmlFor="number" className="py-2">
          Número
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          value={number}
          name="number"
          placeholder="Nº"
          onChange={(e) => {
            setNumber(e.target.value);
            updateField({ number: e.target.value });
          }}
        />
        <label htmlFor="cep" className="py-2">
          CEP
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="cep"
          value={cep}
          placeholder="00000-000"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setCep(value.length === 8 ? formatCepString(value) : value);
            updateField({ cep: value });
          }}
        />
      </div>
    </div>
  );
}
