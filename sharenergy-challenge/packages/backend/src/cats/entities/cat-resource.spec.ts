import { CatResource } from './cat-resouce';

describe('CatResource tests', () => {
  it('should be able to create a CatResource with status of error', () => {
    const uut = CatResource.withError();
    expect(uut.url).toBeNull();
    expect(uut.status).toBe('error');
  });
  it('should be able to create a CatResource with status of ok', () => {
    const uut = CatResource.withOkStatus('https://www.google.com');
    expect(uut.url.toString()).toBe('https://www.google.com/');
    expect(uut.status).toBe('ok');
  });
  it('Should throw if resouce url passed is not a valid url', () => {
    expect(() => CatResource.withOkStatus('some-invalid-url')).toThrowError(
      TypeError('Invalid URL')
    );
  });
});
