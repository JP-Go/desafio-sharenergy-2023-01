import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { HttpCatsRepository } from './http-cats.repository';

describe('Http Cats repository test', () => {
  let repository: HttpCatsRepository;
  let httpServiceMock: HttpService;

  beforeEach(async () => {
    httpServiceMock = new HttpService();
    repository = new HttpCatsRepository(httpServiceMock);
  });

  it("Should return a CatResource with 'ok' code when the http code is valid", async () => {
    jest
      .spyOn(httpServiceMock, 'get')
      .mockReturnValue(
        of({ data: '', statusText: 'OK', status: 200, headers: {}, config: {} })
      );
    const callResult = await repository.getCatByCode(200);
    expect(callResult.url).toBeInstanceOf(URL);
    expect(callResult.url?.toString()).toBe('https://http.cat/200');
    expect(callResult.status).toBe('ok');
  });
  it("Should return a CatResource with 'error' code when the http code is invalid", async () => {
    jest
      .spyOn(httpServiceMock, 'get')
      .mockReturnValue(
        of({
          data: '',
          statusText: 'Not Found',
          status: 404,
          headers: {},
          config: {},
        })
      );
    const callResult = await repository.getCatByCode(5000);
    expect(callResult.url).toBeNull();
    expect(callResult.status).toBe('error');
  });
});
