import { CatResource } from '../entities/cat-resouce';

export abstract class CatsRepository {
  abstract getCatByCode: (code: number) => Promise<CatResource>;
}
