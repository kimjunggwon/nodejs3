import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  //NestExpressApplication의 인스턴스 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //정적 파일 경로 지정
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(3000);
}
bootstrap();
