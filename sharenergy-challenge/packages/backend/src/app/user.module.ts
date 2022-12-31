import { Module } from '@nestjs/common';
import { RandomUserApiRepository } from './repositories/random-user-api-repository';
import UserRepository from './repositories/user-repository';
import UserController from './controllers/user.controller';
import UserService from './services/user.service';

@Module({
  imports: [],
  providers: [
    UserService,
    { provide: UserRepository, useClass: RandomUserApiRepository },
  ],
  controllers: [UserController],
})
export default class UserModule {}
