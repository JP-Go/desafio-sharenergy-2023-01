import { Injectable } from '@nestjs/common';
import UserRepository from '../repositories/user-repository';

@Injectable()
export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(page: number, results: number) {
    return await this.userRepository.getUsers(page, results);
  }
}
