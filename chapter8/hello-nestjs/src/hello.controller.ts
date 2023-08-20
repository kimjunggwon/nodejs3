import { Controller, Get } from "@nestjs/common"; //필요한 함수 임포트

@Controller() //컨트롤러 데코레이터
export class HelloController{ //외부에서 사용하므로 export 선언
    @Get() //GET 요청 처리 데코레이터
    hello() {
        return "NestJS 첫 애플리케이션";
    }
}