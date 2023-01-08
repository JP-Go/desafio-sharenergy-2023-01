import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from '../cats/cats.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    CatsModule,
    ClientModule,
    MongooseModule.forRoot(
      process.env.CONNECTION_STRING ??
        'mongodb://root:password@127.0.0.1:27020/sharenergy?authSource=admin'
    ),
  ],
})
export class AppModule {}
