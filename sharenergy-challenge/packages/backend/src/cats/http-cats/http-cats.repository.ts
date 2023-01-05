import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CatsRepository } from '../contracts/cats.repository';
import { CatResource } from '../entities/cat-resouce';

@Injectable()
export class HttpCatsRepository implements CatsRepository {
  private HTTP_CATS_URL = 'https://http.cat';

  constructor(private readonly httpService: HttpService) {}

  async getCatByCode(code: number) {
    const fullUrl = `${this.HTTP_CATS_URL}/${code}`;
    const response = await firstValueFrom(
      this.httpService.get(fullUrl).pipe(
        catchError((error: AxiosError) => {
          const logger = new Logger(CatsRepository.name);
          logger.error(error.response.data);
          throw 'Error fetching from HTTP.cat api';
        })
      )
    );

    return response.status === 200
      ? CatResource.withOkStatus(fullUrl)
      : CatResource.withError(null);
  }
}
