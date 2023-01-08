import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Address extends Document {
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) state: string;
  @Prop({ required: true }) cep: string;
  @Prop({ required: true }) number: string;
  @Prop({ required: true }) street: string;
}
