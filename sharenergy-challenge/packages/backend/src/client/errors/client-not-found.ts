import { NotFoundException } from '@nestjs/common';

export class ClientNotFound extends NotFoundException {
  constructor() {
    super('Client not found');
  }
}
