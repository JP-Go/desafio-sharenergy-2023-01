import { ClientRepository } from '../../client/client.repository';
import { Address } from '../../client/entities/address';
import { Client, ClientProps } from '../../client/entities/client';

export class InMemoryClientRepository implements ClientRepository {
  private clients = [
    new Client(
      {
        address: new Address(
          {
            cep: '00000-00',
            city: 'Salvador',
            number: '203a',
            street: 'Rua Carmelita',
            state: 'Bahia',
          },
          'a1'
        ),
        cpf: '536.459.470-00',
        phone: '+55086988887777',
        email: 'cliente1@share.com',
        name: 'Cliente 1',
      },
      'c1'
    ),
    new Client(
      {
        address: new Address(
          {
            cep: '00000-00',
            city: 'Salvador',
            number: '203a',
            street: 'Rua Carmelita',
            state: 'Bahia',
          },
          'a1'
        ),
        cpf: '061.723.150-80',
        phone: '+55086988887777',
        email: 'cliente2@share.com',
        name: 'Cliente 2',
      },
      'c2'
    ),
  ];

  async findById(id: string) {
    const client = this.clients.find((client) => client.id == id);
    if (!client) throw new Error('Cliente não existe');
    return client;
  }
  async findMany() {
    return this.clients;
  }

  async save(clientProps: Partial<ClientProps>, id?: string | undefined) {
    const existingClient = id !== undefined ? await this.findById(id) : id;
    if (existingClient) {
      const clientIndex = this.clients.findIndex((c) => c === existingClient);
      const newProps = { ...existingClient.props, ...clientProps };
      this.clients[clientIndex].props = newProps;
      return this.clients[clientIndex];
    } else {
      const newClientId = this.nextId();
      const newClient = new Client(clientProps as ClientProps, newClientId);
      this.clients.push(newClient);
      return newClient;
    }
  }
  async delete(id: string) {
    const userExists = this.clients.some((client) => client.id === id);
    if (!userExists) throw new Error('Non existing user');
    this.clients = this.clients.filter((client) => client.id !== id);
  }

  nextId() {
    const lastId = this.clients[this.clients.length - 1].id;
    if (lastId === null) {
      throw new Error('Database integrity lost.');
    }
    const newId = `c${Number(lastId.charAt(lastId.length - 1)) + 1}`;
    return newId;
  }
}
