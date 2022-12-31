import User from '../../app/entities/user';
import UserRepository from '../../app/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  private defaultLimit = 20;
  private users = new Array(100)
    .fill(0)
    .map(
      (_, index) =>
        new User(
          'https://www.google.com',
          `User ${index + 1}`,
          'user@email.com',
          'useruser',
          28
        )
    );
  async getUsers(page?: number, limit?: number) {
    const pageSize = limit ? limit : this.defaultLimit;
    const start = page ? (page - 1) * pageSize : 0;
    const end = start + pageSize;
    return this.users.slice(start, end);
  }
}
