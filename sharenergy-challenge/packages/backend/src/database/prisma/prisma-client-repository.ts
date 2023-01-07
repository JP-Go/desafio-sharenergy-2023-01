import { Injectable } from '@nestjs/common';
import { Client } from '../../client/entities/client';
import { ClientRepository } from '../../client/client.repository';
import { PrismaService } from './prisma-service';
import { PrismaClientMapper } from './mappers/prisma-client-mapper';
import { NonExistingClient } from '../../errors/non-existing-client';
import { Address } from '@prisma/client';

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
      },
    });
    return client !== null ? PrismaClientMapper.toDomain(client) : null;
  }
  async findMany() {
    const clients = await this.prisma.client.findMany();
    return clients.map(PrismaClientMapper.toDomain);
  }

  async save(client: Client) {
    const raw = PrismaClientMapper.toPersistence(client);
    const newClient = await this.prisma.client.create({
      data: raw,
    });
    return PrismaClientMapper.toDomain(newClient);
  }

  async update(clientProps: Partial<Client>, id: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
      },
    });

    if (!client) throw new NonExistingClient(id);

    const address: Address = { ...clientProps.address, ...client.address };
    const updatedClient = { ...clientProps, ...client, address };
    const rawUpdatedClient = await this.prisma.client.update({
      where: {
        id: updatedClient.id,
      },
      data: updatedClient,
    });

    return PrismaClientMapper.toDomain(rawUpdatedClient);
  }

  async delete(id: string) {
    await this.prisma.client.delete({
      where: {
        id,
      },
    });
  }
}
