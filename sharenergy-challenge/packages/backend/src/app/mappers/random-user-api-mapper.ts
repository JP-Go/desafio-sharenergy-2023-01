import User from '../entities/user';

export interface RandomApiUser {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
  dob: {
    age: number;
  };
  picture: {
    thumbnail: string;
  };
}
export default class RandomUserApiMapper {
  public static toDomain({ name, email, dob, login, picture }: RandomApiUser) {
    const fullName = `${name.first} ${name.last}`;
    const avatarUrl = picture.thumbnail;
    const username = login.username;
    const age = dob.age;
    return new User(avatarUrl, fullName, email, username, age);
  }
}
