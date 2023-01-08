import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CpfTaken } from '../../client/errors/cpf-taken';
import { EmailTaken } from '../../client/errors/email-taken';
import { ClientMapper } from './mappers/mongoose-client-mapper';
import { ClientNotFound } from '../../client/errors/client-not-found';
import { ClientRepository } from '../../client/client.repository';
import { ClientDocument, Client as ClientModel } from './schemas/client.schema';
import { Client } from '../../client/entities/client';
import { AddressProps } from '../../client/entities/address';
import { Replace } from '../../helpers/replace';

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

    const newClient = await this.clientModel.create(
      ClientMapper.toPersistence(client)
    );
    return ClientMapper.toDomain(newClient);
  }

  async update(
    data: Replace<Partial<Client>, { address: Partial<AddressProps> }>,
    id: string
  ) {
    const { city, cep, state, street, number } = (await this.findById(id))
      .address;
    const addressData = {
      city: data.address.city ?? city,
      cep: data.address.cep ?? cep,
      state: data.address.state ?? state,
      street: data.address.street ?? street,
      number: data.address.number ?? number,
    };
    const existingClient = await this.clientModel
      .updateOne({ _id: id }, { ...data, address: addressData })
      .exec();

    if (!existingClient.acknowledged) {
      throw new ClientNotFound();
    }

    return this.findById(id);
  }

  async delete(id: string) {
    const deleted = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new ClientNotFound();
    }
  }
}
