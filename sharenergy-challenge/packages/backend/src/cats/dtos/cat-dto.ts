import { CatResource } from '../entities/cat-resouce';
import { CatResourceStatus } from '@sharenergy-challenge/shared-types';

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
