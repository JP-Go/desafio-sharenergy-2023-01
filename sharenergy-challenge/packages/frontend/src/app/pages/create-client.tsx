import { FormEvent, useState } from 'react';
import ClientDataForm from '../components/Form/ClientDataForm';
import AddressForm from '../components/Form/AddressForm';
import AuthedPage from './authed-page';
import Header from '../components/Header';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

export interface FormData {
  city: string;
  cep: string;
  state: string;
  street: string;
  number: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

const initialFormData = {
  city: '',
  cep: '',
  state: '',
  street: '',
  number: '',
  name: '',
  cpf: '',
  email: '',
  phone: '',
};

export default function CreateClientForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const navigate = useNavigate();

  function sendForm(e: FormEvent) {
    e.preventDefault();
    console.log(formData);
  }

  function updateField(fields: Partial<FormData>) {
    setFormData((data) => ({ ...data, ...fields }));
  }

  return (
    <AuthedPage>
      <Header path="/clients" />
      <Card className="w-4/5 mx-auto mt-8 p-8 relative">
        <h1 className="font-bold text-2xl text-center mb-8">
          Preencha os dados do cliente
        </h1>
        <form onSubmit={sendForm}>
          <div className="flex gap-10 lg:gap-20 justify-center">
            <ClientDataForm updateField={updateField} />
            <AddressForm updateField={updateField} />
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-indigo-500 text-white p-2 rounded-lg"
          >
            Concluido
          </button>
        </form>
        <button
          type="button"
          onClick={() => navigate('/clients', { replace: true })}
          className="w-fit absolute -top-4 -left-4 bg-indigo-500 text-white p-2 rounded-lg"
        >
          ⬅ Voltar
        </button>
      </Card>
    </AuthedPage>
  );
}
