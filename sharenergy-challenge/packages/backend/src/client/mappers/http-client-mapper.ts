import { AddressProps } from '../entities/address';
import { Client } from '../entities/client';

interface HttpClientReponse {
  id: string;
  name: string;
  cpf: string;
  email: string;
  address: AddressProps;
}

export class HttpClientMapper {
  static toHttp(client: Client): HttpClientReponse {
    return {
      id: client.id as string,
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      address: {
        city: client.address.city,
        state: client.address.state,
        cep: client.address.cep,
        number: client.address.number,
        street: client.address.street,
      },
    };
  }
}
