import { FormData } from '../../pages/create-client';

interface ClientDataFormProps {
  updateField: (fields: Partial<FormData>) => void;
}

export default function ClientDataForm({ updateField }: ClientDataFormProps) {
  return (
    <div>
      <h2 className="font-bold text-lg">Dados do cliente</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="py-2">
          Nome:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="name"
          placeholder="Nome"
          onChange={(e) => updateField({ name: e.target.value })}
        />
        <label htmlFor="cpf" className="py-2">
          CPF:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="cpf"
          placeholder="CPF"
          onChange={(e) => updateField({ cpf: e.target.value })}
        />
        <label htmlFor="email" className="py-2">
          Email:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="email"
          required
          name="email"
          placeholder="E-mail"
          onChange={(e) => updateField({ email: e.target.value })}
        />
        <label htmlFor="phone" className="py-2">
          Telefone (formato: DD-XXXXX-XXXX):
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="phone"
          placeholder="86-96666-7777"
          pattern="\d{2}-\d{5}-\d{4}"
          onChange={(e) => updateField({ phone: e.target.value })}
        />
      </div>
    </div>
  );
}
