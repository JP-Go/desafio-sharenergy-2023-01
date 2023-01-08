import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Client } from '../../client/entities/client';
import { ClientRepository } from '../../client/client.repository';
import { ClientDocument, Client as ClientModel } from './schemas/client.schema';
import { ClientMapper } from './mappers/client-mapper';

@Injectable()
export class MongooseClientRepository implements ClientRepository {
  constructor(
    @InjectModel(ClientModel.name)
    private readonly catModel: Model<ClientDocument>
  ) {}

  async findMany() {
    const rawClients = await this.catModel.find().exec();
    return rawClients.map(ClientMapper.toDomain);
  }

  findById: (id: string) => Promise<Client>;
  save: (client: Client) => Promise<Client>;
  update: (client: Partial<Client>, id: string) => Promise<Client>;
  delete: (id: string) => Promise<void>;
}
