import { CatResource, CatResourceStatus } from '../entities/cat-resouce';

export type CatResourceHttpResponse = {
  url: string | null;
  status: CatResourceStatus;
};

export class CatDto {
  static toHttp(catResource: CatResource): CatResourceHttpResponse {
    return {
      url: catResource.url?.toString() ?? null,
      status: catResource.status,
    };
  }
}
