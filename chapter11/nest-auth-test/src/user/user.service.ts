import { Injectable } from '@nestjs/common';
//리포지토리 주입 데코레이터
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
//리포지토리 임포트
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    //리포지토리 주입
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    //유저 생성
    createUser(user): Promise<User> {
        return this.userRepository.save(user);
    }

    //한 명의 유저 정보 조회
    async getUser(email: string) {
        const result = await this.userRepository.findOne({
            where: { email },
        });
        return result;
    }

    //유저 정보 업데이트, username과 password만 변경
    async updateUser(email, _user){
        const user: User = await this.getUser(email);
        console.log(_user);
        user.username = _user.username;
        user.password = _user.password;
        console.log(user);
        this.userRepository.save(user);
    }

    //유저 정보 삭제
    deleteUser(email: any){
        return this.userRepository.delete({ email });
    }

    async findByEmailOrSave(email, username, providerId): Promise<User> {
        const foundUser = await this.getUser(email); //이메일로 유저를 찾음
        if(foundUser){
            return foundUser;
        }
        //찾으면 유저 정보를 반환

        const newUser = await this.userRepository.save({ //유저 정보가 없으면 저장
            email,
            username,
            providerId,
        });
        return newUser; //저장 후 유저 정보 반환
    }
}
