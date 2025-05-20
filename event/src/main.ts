import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { EventModule } from './event.module';

@Module({})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(EventModule);
  await app.listen(3000);
}
bootstrap();
