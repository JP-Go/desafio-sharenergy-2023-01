import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Address, AddressProps } from './entities/address';
import { Client, ClientProps } from './entities/client';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async findAll() {
    return await this.repository.findMany();
  }

  async findOne(id: string) {
    const client = await this.repository.findById(id);
    return client;
  }

  async create(createClientDto: CreateClientDto) {
    const addressProps: AddressProps = {
      cep: createClientDto.address.cep,
      city: createClientDto.address.city,
      number: createClientDto.address.number,
      state: createClientDto.address.state,
      street: createClientDto.address.street,
    };
    const props: ClientProps = {
      cpf: createClientDto.cpf,
      name: createClientDto.name,
      email: createClientDto.email,
      phone: createClientDto.phone,
      address: new Address(addressProps),
    };
    return await this.repository.save(new Client(props));
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }
}
