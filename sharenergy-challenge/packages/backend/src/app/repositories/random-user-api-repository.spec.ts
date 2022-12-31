import UserRepository from './user-repository';
import { RandomUserApiRepository } from './random-user-api-repository';
import User from '../entities/user';

describe('UserRepository tests', () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new RandomUserApiRepository();
  });

  it('should be able to return a list of users', async () => {
    const users = await repository.getUsers();
    const firstUser = new User(
      'https://randomuser.me/api/portraits/thumb/women/96.jpg',
      'Iida Maki',
      'iida.maki@example.com',
      'orangebutterfly657',
      31
    );
    expect(users.length).toBe(30);
    users.forEach((element) => {
      expect(element).toBeInstanceOf(User);
    });
    expect(users[0]).toStrictEqual(expect.objectContaining(firstUser));
  });

  it('should be able to get users from the second page', async () => {
    const users = await repository.getUsers(2);
    const firstUserFromSecondPage = new User(
      'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      'Emma Ahola',
      'emma.ahola@example.com',
      'beautifulmeercat315',
      62
    );
    expect(users.length).toBe(30);
    users.forEach((element) => {
      expect(element).toBeInstanceOf(User);
    });
    expect(users[0]).toStrictEqual(
      expect.objectContaining(firstUserFromSecondPage)
    );
  });

  it('should be able to be used with diferent page sizes', async () => {
    const users = await repository.getUsers(2, 10);
    const firstUserFromSecondPage = new User(
      'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      'Emma Ahola',
      'emma.ahola@example.com',
      'beautifulmeercat315',
      62
    );
    expect(users.length).toBe(10);
    users.forEach((element) => {
      expect(element).toBeInstanceOf(User);
    });
    expect(users[0]).toStrictEqual(
      expect.objectContaining(firstUserFromSecondPage)
    );
  });
});
