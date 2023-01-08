import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientRepository } from '../client/client.repository';
import { MongooseClientRepository } from './mongoose/mongoose-client.repository';
import { Client, ClientSchema } from './mongoose/schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [
    {
      provide: ClientRepository,
      useClass: MongooseClientRepository,
    },
  ],
  exports: [ClientRepository],
})
export class DatabaseModule {}
