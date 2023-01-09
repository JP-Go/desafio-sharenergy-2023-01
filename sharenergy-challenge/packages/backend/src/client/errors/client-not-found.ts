import { NotFoundException } from '@nestjs/common';

export class ClientNotFound extends NotFoundException {
  constructor() {
    super('Cliente não encontrado');
  }
}
