import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; //ConfigService 임포트

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {} //ConfigService 주입

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE'); //configService.get() 호출
    return message;
  }

  @Get('service-url') // http://localhost:3000/service-url의 경로 진입 시 실행
  getServiceUrl(): string {
    return this.configService.get('SERVICE_URL'); //SERVICE_URL 환경 변수 반환
  }

  @Get('db-info') //라우팅 정보
  getTest(): string {
    //logLevel 터미널에 출력
    console.log(this.configService.get('logLevel'));
    //apiVersion 터미널에 출력
    console.log(this.configService.get('apiVersion'));
    //웹브라우저에 dbInfo 표시
    return this.configService.get('dbInfo');
  }

  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }

  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL'); //확장 변숫값 읽기
  }
}