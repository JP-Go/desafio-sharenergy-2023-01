import { FormData } from '../../pages/create-client';

interface AddressFormProps {
  updateField: (fields: Partial<FormData>) => void;
}

export default function ClientDataForm({ updateField }: AddressFormProps) {
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
          placeholder="Estado"
          onChange={(e) => updateField({ state: e.target.value })}
        />
        <label htmlFor="city" className="py-2">
          Cidade:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="city"
          placeholder="Cidade"
          onChange={(e) => updateField({ city: e.target.value })}
        />
        <label htmlFor="street" className="py-2">
          Rua:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="street"
          placeholder="E-mail"
          onChange={(e) => updateField({ street: e.target.value })}
        />
        <label htmlFor="number" className="py-2">
          Número
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="number"
          placeholder="Telefone"
          onChange={(e) => updateField({ number: e.target.value })}
        />
        <label htmlFor="cep" className="py-2">
          CEP
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="cep"
          placeholder="Telefone"
          onChange={(e) => updateField({ cep: e.target.value })}
        />
      </div>
    </div>
  );
}
