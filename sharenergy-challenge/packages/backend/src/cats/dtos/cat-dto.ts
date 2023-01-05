import { CatResource } from '../entities/cat-resouce';

export class CatDto {
  static toHttp(catResource: CatResource) {
    return {
      url: catResource.url,
      status: catResource.status,
    };
  }
}
