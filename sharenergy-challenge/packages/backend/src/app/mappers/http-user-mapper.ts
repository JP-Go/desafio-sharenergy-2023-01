import User from '../entities/user';

export class HttpUserMapper {
  static toHTTP({ username, age, email, fullName, avatarUrl }: User) {
    return {
      username,
      age,
      email,
      fullName,
      avatarUrl,
    };
  }
}
