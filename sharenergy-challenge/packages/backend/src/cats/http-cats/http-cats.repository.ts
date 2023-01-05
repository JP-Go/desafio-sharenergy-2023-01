import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { CatsRepository } from '../contracts/cats.repository';
import { CatResource } from '../entities/cat-resouce';

@Injectable()
export class HttpCatsRepository implements CatsRepository {
  private HTTP_CATS_URL = 'https://http.cat';

  constructor(private readonly httpService: HttpService) { }

  async getCatByCode(code: number) {
    const fullUrl = `${this.HTTP_CATS_URL}/${code}`;
    const responseStatus = await firstValueFrom(
      this.httpService.get(fullUrl).pipe(
        map((response) => {
          return response.status;
        }),
        catchError((err: AxiosError) => {
          if (err.response?.status === 404) return of(404);
          else {
            throw 'Uncaught Error';
          }
        })
      )
    );

    return responseStatus === 200
      ? CatResource.withOkStatus(fullUrl)
      : CatResource.withError();
  }
}
