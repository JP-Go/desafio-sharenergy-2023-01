import { CreateClientDto } from '../dto/create-client.dto';
import { Address, AddressProps } from '../entities/address';
import { Client } from '../entities/client';

interface HttpClientReponse {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: AddressProps;
}

export class HttpClientMapper {
  static toHttp(client: Client): HttpClientReponse {
    return {
      id: client.id as string,
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
      address: {
        city: client.address.city,
        state: client.address.state,
        cep: client.address.cep,
        number: client.address.number,
        street: client.address.street,
      },
    };
  }

  static toDomain(clientDto: CreateClientDto): Client {
    const addressProps = {
      cep: clientDto.address.cep,
      city: clientDto.address.city,
      number: clientDto.address.number,
      state: clientDto.address.state,
      street: clientDto.address.street,
    };
    const props = {
      cpf: clientDto.cpf,
      name: clientDto.name,
      email: clientDto.email,
      phone: clientDto.phone,
      address: new Address(addressProps),
    };

    return new Client(props);
  }
}
