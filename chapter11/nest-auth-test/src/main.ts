//validationPipe 임포트
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ppid } from 'process';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //전역 파이프에 validationPipe 객체 추가
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret', //세션 암호화에 사용되는 키
      resave: false, //세션을 항상 저장할지 여부
      saveUninitialized: false, //세션이 저장되기 전에는 초기화 되지 않는 상태로 세션을 미리 만들어 저장
      cookie: {
        maxAge: 360000
      },
      //쿠키 유효기간 1시간
    }),
  );
  //passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
