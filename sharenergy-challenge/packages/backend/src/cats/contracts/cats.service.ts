import { CatResource } from '../entities/cat-resouce';

export abstract class CatsService {
  abstract getCatByCode: (code: number) => Promise<CatResource>;
}
