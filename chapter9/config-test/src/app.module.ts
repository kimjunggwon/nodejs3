import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV); //기동 시 환경 변수 출력
console.log('current working directory : ' + process.cwd()); //현재 디렉터리 출력
console.log(`${process.cwd()}/envs/${process.env.NODE_ENV}.env`);
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    //환경 변수 파일로 지정
    load: [config],
    //커스텀 설정 파일 설정
    expandVariables: true,
    //확장 변수 옵션 추가
  }), 
  WeatherModule
], //ConfigModule 설정
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}