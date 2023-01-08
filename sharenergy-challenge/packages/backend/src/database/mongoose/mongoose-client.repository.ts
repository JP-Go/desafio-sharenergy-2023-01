import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Client } from '../../client/entities/client';
import { ClientNotFound } from '../../client/errors/client-not-found';
import { CpfTaken } from '../../client/errors/cpf-taken';
import { EmailTaken } from '../../client/errors/email-taken';
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

  async save(client: Client) {
    const notUniqueEmail = await this.clientModel.findOne({
      email: client.email,
    });
    const notUniqueCpf = await this.clientModel.findOne({
      cpf: client.cpf,
    });
    if (!!notUniqueEmail) throw new EmailTaken();
    if (!!notUniqueCpf) throw new CpfTaken();

    const newClient = await this.clientModel.create({
      name: client.name,
      cpf: client.cpf,
      phone: client.phone,
      email: client.email,
      address: {
        cep: client.address.cep,
        city: client.address.city,
        state: client.address.state,
        number: client.address.number,
        street: client.address.street,
      },
    });
    return ClientMapper.toDomain(newClient);
  }

  update: (client: Partial<Client>, id: string) => Promise<Client>;

  async delete(id: string) {
    const exists = await this.clientModel.exists({ id }).exec();
    if (!exists) {
      throw new ClientNotFound();
    }
    await this.clientModel.deleteOne({ _id: id }).exec();
  }
}
