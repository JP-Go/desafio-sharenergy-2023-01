import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CatsService } from '../contracts/cats.service';
import { CatDto } from '../dtos/cat-dto';

@Controller('cats')
export class HttpCatsController {
  constructor(private readonly httpCatsService: CatsService) {}

  @Get(':code')
  async getCatByCode(@Param('code', ParseIntPipe) code: number) {
    const cat = await this.httpCatsService.getCatByCode(code);
    return CatDto.toHttp(cat);
  }
}
