import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HttpClientMapper } from './mappers/http-client-mapper';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findAll() {
    return await this.clientRepository.findMany();
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findById(id);
    return client;
  }

  async create(createClientDto: CreateClientDto) {
    const client = HttpClientMapper.toDomain(createClientDto);
    return await this.clientRepository.save(client);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const data = JSON.parse(JSON.stringify(updateClientDto));
    return await this.clientRepository.update(data, id);
  }

  async remove(id: string) {
    await this.clientRepository.delete(id);
  }
}
