import { InMemoryHttpCatsHtttpService } from '../../test/http-cats/in-memory-http-cats-http-service';
import { HttpCatsController } from './http-cats.controller';
import { HttpCatsRepository } from './http-cats.repository';
import { HttpCatsService } from './http-cats.service';

describe('HttpCats controller tests', () => {
  let controller: HttpCatsController;
  let service: HttpCatsService;
  let repository: HttpCatsRepository;

  beforeEach(async () => {
    repository = new HttpCatsRepository(new InMemoryHttpCatsHtttpService());
    service = new HttpCatsService(repository);
    controller = new HttpCatsController(service);
  });

  it('Should respond to the request correctly whena valid status code is done', async () => {
    const response = await controller.getCatByCode(200);
    expect(response).toBeTruthy();
    expect(response.url?.toString()).toBe('https://http.cat/200');
    expect(response.status).toBe('ok');
  });

  it('should respond with an error if the provided status code is invalid', async () => {
    const response = await controller.getCatByCode(4000);
    expect(response.url).toBeNull();
    expect(response.status).toBe('error');
  });
});
