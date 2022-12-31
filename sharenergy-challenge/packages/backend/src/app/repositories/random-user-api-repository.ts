import { Injectable } from '@nestjs/common';
import RandomUserApiMapper, {
  RandomApiUser,
} from '../mappers/random-user-api-mapper';
import UserRepository from './user-repository';

@Injectable()
export class RandomUserApiRepository implements UserRepository {
  private RANDOM_USER_API_BASE_URL = 'https://randomuser.me/api/';
  private DEFAULT_NUMBER_OF_RESULTS = 30;
  private SEED = 'random_seed';

  async getUsers(page?: number) {
    const apiUsers = (
      await (
        await fetch(
          `${this.RANDOM_USER_API_BASE_URL}?seed=${this.SEED}&results=${
            this.DEFAULT_NUMBER_OF_RESULTS
          }&page=${page !== undefined ? page : 1}`
        )
      ).json()
    ).results as RandomApiUser[];

    const users = apiUsers.map(RandomUserApiMapper.toDomain);

    return users;
  }
}
