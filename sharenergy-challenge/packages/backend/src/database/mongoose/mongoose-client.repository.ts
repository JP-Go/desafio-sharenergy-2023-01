import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Client } from '../../client/entities/client';
import { ClientNotFound } from '../../client/errors/client-not-found';
import { ClientRepository } from '../../client/client.repository';
import { ClientDocument, Client as ClientModel } from './schemas/client.schema';
import { ClientMapper } from './mappers/mongoose-client-mapper';

@Injectable()
export class MongooseClientRepository implements ClientRepository {
  constructor(
    @InjectModel(ClientModel.name)
    private readonly clientModel: Model<ClientDocument>
  ) {}

  async findMany() {
    const rawClients = await this.clientModel.find().exec();
    return rawClients.map(ClientMapper.toDomain);
  }

  async findById(id: string) {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new ClientNotFound();
    }
    return ClientMapper.toDomain(client);
  }
  save: (client: Client) => Promise<Client>;
  update: (client: Partial<Client>, id: string) => Promise<Client>;
  async delete(id: string) {
    const exists = await this.clientModel.exists({ id }).exec();
    if (!exists) {
      throw new ClientNotFound();
    }
    await this.clientModel.deleteOne({ _id: id }).exec();
  }
}
