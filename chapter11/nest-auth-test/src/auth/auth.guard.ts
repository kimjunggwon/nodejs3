import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'
import { In } from 'typeorm';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: any): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if(request.cookies['login']){
            return true;
        }

        if(!request.body.email || !request.body.password){
            return false;
        }

        const user = await this.authService.validateUser(
            request.body.email,
            request.body.password,
        );

        if(!user){
            return false;
        }

        request.user = user;
        return true;
    }
}

@Injectable() //AuthGuard 상속
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: any): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        //로컬 스트래티지 실행
        const request = context.switchToHttp().getRequest();
        await super.logIn(request); //세션 저장
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated(); //세션에서 정보를 읽어서 인증 확인
    }
}

@Injectable()
//google 스트래티지 사용
export class GoogleAuthGuard extends AuthGuard('google'){
    async canActivate(context: any): Promise<boolean> {
        //부모 클래스의 메서드 사용
        const result = (await super.canActivate(context)) as boolean;
        //컨텍스트에서 리퀘스트 객체를 꺼냄
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}