import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/nest'),
    AuthModule,
  ],
})
export class AppModule {}
