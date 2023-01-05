import { CatResource } from '../entities/cat-resouce';
import { CatDto } from './cat-dto';

describe('Cat Dto tests', () => {
  it("should correctly transform a CatResource entity with a 'ok' status to a CatResouceHttpResponse", () => {
    const result = CatDto.toHttp(
      CatResource.withOkStatus('https://www.google.com/')
    );
    expect(result).toStrictEqual(
      expect.objectContaining({
        url: 'https://www.google.com/',
        status: 'ok',
      })
    );
  });
  it("should correctly transform a CatResource entity with a 'error' status to a CatResouceHttpResponse", () => {
    const result = CatDto.toHttp(CatResource.withError());
    expect(result).toStrictEqual(
      expect.objectContaining({
        url: null,
        status: 'error',
      })
    );
  });
});
