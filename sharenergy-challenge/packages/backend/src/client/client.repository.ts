import { Client } from '../client/entities/client';

export abstract class ClientRepository {
  abstract findById: (id: string) => Promise<Client | null>;
  abstract findMany: () => Promise<Client[]>;
  abstract save: (client: Client) => Promise<Client>;
  abstract update: (client: Partial<Client>, id: string) => Promise<Client>;
  abstract delete: (id: string) => Promise<void>;
}
