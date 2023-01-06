import { Client } from '../../../client/entities/client';
import { Client as RawClient } from '@prisma/client';
import { Address } from 'packages/backend/src/client/entities/address';

export class PrismaClientMapper {
  static toPersistence(client: Client): Omit<RawClient, 'id'> {
    return {
      cpf: client.cpf,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: { ...client.address.props },
    };
  }

  static toDomain({ address, id, phone, email, name, cpf }: RawClient): Client {
    return new Client(
      {
        address: new Address(address),
        phone,
        name,
        email,
        cpf,
      },
      id
    );
  }
}
