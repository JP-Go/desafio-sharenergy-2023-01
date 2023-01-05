import { CatsService } from '../contracts/cats.service';
import { Injectable } from '@nestjs/common';
import { CatsRepository } from '../contracts/cats.repository';

@Injectable()
export class HttpCatsService implements CatsService {
  constructor(private readonly httpCatsRepository: CatsRepository) {}

  async getCatByCode(code: number) {
    return await this.httpCatsRepository.getCatByCode(code);
  }
}
