import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CatsRepository } from './contracts/cats.repository';
import { CatsService } from './contracts/cats.service';
import { HttpCatsController } from './http-cats/http-cats.controller';
import { HttpCatsRepository } from './http-cats/http-cats.repository';
import { HttpCatsService } from './http-cats/http-cats.service';

@Module({
  imports: [HttpModule],
  controllers: [HttpCatsController],
  providers: [
    { provide: CatsService, useClass: HttpCatsService },
    { provide: CatsRepository, useClass: HttpCatsRepository },
  ],
})
export class CatsModule {}
