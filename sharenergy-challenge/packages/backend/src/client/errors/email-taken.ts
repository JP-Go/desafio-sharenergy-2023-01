import { BadRequestException } from '@nestjs/common';

export class EmailTaken extends BadRequestException {
  constructor() {
    super('Email já cadastrado');
  }
}
