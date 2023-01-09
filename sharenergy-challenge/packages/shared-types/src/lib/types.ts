export interface AddressProps {
  city: string;
  cep: string;
  state: string;
  street: string;
  number: string;
}

export interface HttpClientReponse {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: AddressProps;
}

export type CatResourceStatus = 'ok' | 'error';
