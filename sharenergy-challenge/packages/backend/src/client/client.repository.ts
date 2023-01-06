import { Client, ClientProps } from '../client/entities/client';

export abstract class ClientRepository {
  abstract findById: (id: string) => Promise<Client | null>;
  abstract findMany: () => Promise<Client[]>;
  abstract save: (
    clientProps: Partial<ClientProps>,
    id?: string
  ) => Promise<Client>;
  abstract delete: (id: string) => Promise<void>;
}
