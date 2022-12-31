import { Injectable } from '@nestjs/common';
import User from '../entities/user';

@Injectable()
export default abstract class UserRepository {
  abstract getUsers: (page?: number) => Promise<User[]>;
}
