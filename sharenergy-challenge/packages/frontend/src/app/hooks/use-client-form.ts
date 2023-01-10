import { useState } from 'react';
import { ClientFormData } from '../@types/form-data';

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

export function useClientForm() {
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function updateFields(fields: Partial<ClientFormData>) {
    setFormData((data) => ({ ...data, ...fields }));
  }

  return { formData, updateFields, error, message, setError, setMessage };
}
