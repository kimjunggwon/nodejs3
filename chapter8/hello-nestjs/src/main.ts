import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

async function bootstrap(){
//NestJS를 시작시키는 함수
    const app = await NestFactory.create(HelloModule);
    //NestFactory를 사용하여 NestApplication 객체 생성

    await app.listen(3000, () => {
        console.log("서버 시작!");
    });
    //3000번 포트로 서버 기동
}

bootstrap();