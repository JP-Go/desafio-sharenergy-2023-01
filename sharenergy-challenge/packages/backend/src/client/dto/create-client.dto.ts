import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Address } from '../entities/address';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(11)
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @MinLength(11)
  @IsNotEmpty()
  phone: string;

  @IsObject()
  @IsNotEmpty()
  address: Address;
}
