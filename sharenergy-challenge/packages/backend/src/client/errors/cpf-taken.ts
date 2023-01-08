import { BadRequestException } from '@nestjs/common';

export class CpfTaken extends BadRequestException {
  constructor() {
    super('CPF already taken');
  }
}
