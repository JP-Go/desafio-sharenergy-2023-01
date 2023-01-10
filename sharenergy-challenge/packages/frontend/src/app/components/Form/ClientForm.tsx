import Card from '../Card';
import ClientDataForm from './ClientDataForm';
import AddressForm from './AddressForm';
import { FormEvent } from 'react';
import { ClientFormData } from '../../@types/form-data';

interface ClientFormProps {
  handleBack: () => void;
  submit: (e: FormEvent) => void;
  updateFields: (fields: Partial<ClientFormData>) => void;
}
export default function ClientForm({
  handleBack,
  submit,
  updateFields,
}: ClientFormProps) {
  return (
    <Card className="w-4/5 mx-auto mt-8 p-8 relative">
      <button
        type="button"
        onClick={handleBack}
        className="w-fit absolute -top-4 -left-4 bg-indigo-500 text-white p-2 rounded-lg"
      >
        ⬅ Voltar
      </button>
      <h1 className="font-bold text-2xl text-center mb-8">
        Preencha os dados do cliente
      </h1>
      <form onSubmit={submit}>
        <div className="flex gap-10 lg:gap-20 justify-center">
          <ClientDataForm updateField={updateFields} />
          <AddressForm updateField={updateFields} />
        </div>
        <button
          type="submit"
          className="w-full mt-8 bg-indigo-500 text-white p-2 rounded-lg"
        >
          Concluido
        </button>
      </form>
    </Card>
  );
}
