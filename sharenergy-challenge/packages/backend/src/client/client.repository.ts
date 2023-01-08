import { Client } from './entities/client';
import { AddressProps } from './entities/address';
import { Replace } from '../helpers/replace';

export abstract class ClientRepository {
  abstract findById: (id: string) => Promise<Client>;
  abstract findMany: () => Promise<Client[]>;
  abstract save: (client: Client) => Promise<Client>;
  abstract update: (
    client: Replace<Partial<Client>, { address: Partial<AddressProps> }>,
    id: string
  ) => Promise<Client>;
  abstract delete: (id: string) => Promise<void>;
}
