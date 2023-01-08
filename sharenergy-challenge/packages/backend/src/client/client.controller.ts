import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HttpClientMapper } from './mappers/http-client-mapper';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll() {
    const clients = await this.clientService.findAll();
    return clients.map(HttpClientMapper.toHttp);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);
    return HttpClientMapper.toHttp(client);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientService.create(createClientDto);
    return HttpClientMapper.toHttp(client);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto
  ) {
    const client = await this.clientService.update(id, updateClientDto);
    return HttpClientMapper.toHttp(client);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.clientService.remove(id);
  }
}
