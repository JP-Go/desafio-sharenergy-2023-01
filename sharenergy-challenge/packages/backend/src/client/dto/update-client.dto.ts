import {
  IsEmail,
  IsObject,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Address } from '../entities/address';

export class UpdateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(11)
  cpf: string;

  @IsString()
  @MinLength(11)
  phone: string;

  @IsObject()
  address: Address;
}
