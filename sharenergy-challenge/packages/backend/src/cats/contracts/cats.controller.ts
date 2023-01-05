import { CatResource } from '../entities/cat-resouce';

export abstract class CatsController {
  abstract getCatByCode: (code: number) => CatResource;
}
