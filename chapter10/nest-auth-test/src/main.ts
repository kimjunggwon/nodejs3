//validationPipe 임포트
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ppid } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //전역 파이프에 validationPipe 객체 추가
  app.userGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
