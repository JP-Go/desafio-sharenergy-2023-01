import { useState } from 'react';
import { ClientFormData } from '../../@types/form-data';
import { formatCpfString, formatPhoneString } from '../../utils/formatters';

interface ClientDataFormProps {
  updateField: (fields: Partial<ClientFormData>) => void;
}

export default function ClientDataForm({ updateField }: ClientDataFormProps) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div>
      <h2 className="font-bold text-lg">Dados do cliente</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="py-2">
          Nome completo:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            updateField({ name: e.target.value });
          }}
        />
        <label htmlFor="cpf" className="py-2">
          CPF:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="cpf"
          value={cpf}
          placeholder="555.666.777-88"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setCpf(value.length === 11 ? formatCpfString(value) : value);
            updateField({ cpf: value });
          }}
        />
        <label htmlFor="email" className="py-2">
          Email:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="email"
          required
          value={email}
          name="email"
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
            updateField({ email: e.target.value });
          }}
        />
        <label htmlFor="phone" className="py-2">
          Telefone:
        </label>
        <input
          className="rounded-lg outline outline-1 outline-indigo-500 p-2"
          type="text"
          required
          name="phone"
          value={phone}
          placeholder="(86)99999-7777"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            setPhone(value.length === 11 ? formatPhoneString(value) : value);
            updateField({ phone: value });
          }}
        />
      </div>
    </div>
  );
}
