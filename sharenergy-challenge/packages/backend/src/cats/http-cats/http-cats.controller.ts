import { CatsService } from '../contracts/cats.service';
import { CatDto } from '../dtos/cat-dto';
import { Response } from 'express';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';

@Controller('cats')
export class HttpCatsController {
  constructor(private readonly httpCatsService: CatsService) {}

  @Get(':code')
  async getCatByCode(
    @Res({ passthrough: true }) res: Response,
    @Param('code', ParseIntPipe) code: number
  ) {
    const catResource = await this.httpCatsService.getCatByCode(code);
    if (catResource.status === 'error') res.status(HttpStatus.NOT_FOUND);

    return CatDto.toHttp(catResource);
  }
}
