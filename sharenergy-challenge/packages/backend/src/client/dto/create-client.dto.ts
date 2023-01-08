import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Address } from '../entities/address';

class AddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 8, {
    message: 'cep must have 8 characters',
  })
  cep: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;
}

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
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: Address;
}
