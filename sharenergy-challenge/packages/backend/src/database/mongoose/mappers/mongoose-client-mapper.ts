import { ClientDocument } from '../schemas/client.schema';
import { Client, ClientProps } from '../../../client/entities/client';
import { Address } from '../../../client/entities/address';
import { AddressProps } from '@sharenergy-challenge/shared-types';

export class ClientMapper {
  static toDomain({
    address,
    name,
    phone,
    email,
    cpf,
    id,
  }: ClientDocument): Client {
    const addressProps: AddressProps = {
      cep: address.cep,
      city: address.city,
      state: address.state,
      number: address.number,
      street: address.street,
    };

    const props: ClientProps = {
      name: name,
      phone: phone,
      email: email,
      cpf: cpf,
      address: new Address(addressProps),
    };
    const client = new Client(props, id);
    return client;
  }

  static toPersistence(client: Client) {
    const address = client.address;
    const raw = {
      address: {
        city: address.city,
        cep: address.cep,
        state: address.state,
        number: address.number,
        street: address.street,
      },
      phone: client.phone,
      name: client.name,
      email: client.email,
      cpf: client.cpf,
    };

    return raw;
  }
}
