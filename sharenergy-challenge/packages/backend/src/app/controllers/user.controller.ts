import { Controller, Get, Query } from '@nestjs/common';
import { HttpUserMapper } from '../mappers/http-user-mapper';
import UserService from '../services/user.service';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Query('page') page = 1, @Query('limit') limit = 30) {
    const users = await this.userService.getUsers(page, limit);
    return users.map(HttpUserMapper.toHTTP);
  }
}
