import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { Address } from './address.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({
  autoCreate: true,
})
export class Client extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true, unique: true }) cpf: string;
  @Prop({ required: true, type: Address }) address: Address;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
