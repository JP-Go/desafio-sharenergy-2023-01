import { ClientDocument } from '../schemas/client.schema';
import { Client, ClientProps } from '../../../client/entities/client';
import {
  Address,
  AddressProps,
} from 'packages/backend/src/client/entities/address';

export class ClientMapper {
  static toDomain(clientModel: ClientDocument): Client {
    const addressProps: AddressProps = {
      cep: clientModel.address.cep,
      city: clientModel.address.city,
      state: clientModel.address.state,
      number: clientModel.address.number,
      street: clientModel.address.street,
    };
    const props: ClientProps = {
      name: clientModel.name,
      phone: clientModel.phone,
      email: clientModel.email,
      cpf: clientModel.cpf,
      address: new Address(addressProps),
    };
    const client = new Client(props, clientModel.id);
    return client;
  }
}
