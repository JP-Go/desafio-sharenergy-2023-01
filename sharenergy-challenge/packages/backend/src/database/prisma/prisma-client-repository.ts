import { Injectable } from '@nestjs/common';
import {
  Client as DomainClient,
  ClientProps,
} from '../../client/entities/client';
import { ClientRepository } from '../../client/client.repository';
import { PrismaService } from './prisma-service';
import { PrismaClientMapper } from './mappers/prisma-client-mapper';

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

  save: (
    clientProps: Partial<ClientProps>,
    id?: string | undefined
  ) => Promise<DomainClient>;

  async delete(id: string) {
    await this.prisma.client.delete({
      where: {
        id,
      },
    });
  }
}
