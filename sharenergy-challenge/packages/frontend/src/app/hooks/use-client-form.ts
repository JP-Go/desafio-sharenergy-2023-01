import { useState } from 'react';
import { ClientFormData } from '../@types/form-data';

export function useClientForm(initialFormData: ClientFormData) {
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function updateFields(fields: Partial<ClientFormData>) {
    setFormData((data) => ({ ...data, ...fields }));
  }

  return { formData, updateFields, error, message, setError, setMessage };
}
