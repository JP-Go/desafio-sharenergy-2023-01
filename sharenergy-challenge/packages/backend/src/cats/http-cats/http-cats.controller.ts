import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CatsService } from '../contracts/cats.service';

@Controller('cats')
export class HttpCatsController {
  constructor(private readonly httpCatsService: CatsService) {}

  @Get(':code')
  async getCatByCode(@Param('code', ParseIntPipe) code: number) {
    return await this.httpCatsService.getCatByCode(code);
  }
}
