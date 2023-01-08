import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

class AddressDto {
  @IsString()
  @IsOptional()
  @Length(8, 8, {
    message: 'cep must have 8 characters',
  })
  cep?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  number?: string;
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(11)
  @IsOptional()
  cpf?: string;

  @IsString()
  @MinLength(11)
  @IsOptional()
  phone?: string;

  @IsObject()
  @IsOptional()
  address?: AddressDto;
}
