import { Module } from '@nestjs/common';
import { Address } from '../client/entities/address';
import { Client } from '../client/entities/client';
import { ClientRepository } from '../client/client.repository';
import { PrismaClientRepository } from './prisma/prisma-client-repository';
import { PrismaService } from './prisma/prisma-service';

@Module({
  imports: [Client, Address],
  providers: [
    PrismaService,
    { provide: ClientRepository, useClass: PrismaClientRepository },
  ],
})
export class DatabaseModule {}
