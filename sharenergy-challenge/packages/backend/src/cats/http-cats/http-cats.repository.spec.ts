import { HttpService } from '@nestjs/axios';
import { HttpCatsRepository } from './http-cats.repository';
import { InMemoryHttpCatsHtttpService } from '../../test/http-cats/in-memory-http-cats-http-service';

describe('Http Cats repository test', () => {
  let repository: HttpCatsRepository;
  let httpServiceMock: HttpService;

  beforeEach(async () => {
    httpServiceMock = new InMemoryHttpCatsHtttpService();
    repository = new HttpCatsRepository(httpServiceMock);
  });

  it("Should return a CatResource with 'ok' code when the http code is valid", async () => {
    const callResult = await repository.getCatByCode(200);
    expect(callResult.url).toBeInstanceOf(URL);
    expect(callResult.url?.toString()).toBe('https://http.cat/200');
    expect(callResult.status).toBe('ok');
  });

  it("Should return a CatResource with 'error' code when the http code is invalid", async () => {
    const callResult = await repository.getCatByCode(5000);
    expect(callResult.url).toBeNull();
    expect(callResult.status).toBe('error');
  });
});
