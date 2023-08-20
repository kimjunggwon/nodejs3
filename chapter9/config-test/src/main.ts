import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; //ConfigService 임포트

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); //ConfigService를 app.get()에 추가
  await app.listen(configService.get("SERVER_PORT")); //configService 사용
}
bootstrap();
