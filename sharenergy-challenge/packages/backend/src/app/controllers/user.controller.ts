import { Controller, Get, Query } from '@nestjs/common';
import { HttpUserMapper } from '../mappers/user/http-user-mapper';
import UserService from '../services/user.service';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(
    @Query('page') page: number,
    @Query('results') results: number
  ) {
    const users = await this.userService.getUsers(page, results);
    return users.map(HttpUserMapper.toHTTP);
  }
}
