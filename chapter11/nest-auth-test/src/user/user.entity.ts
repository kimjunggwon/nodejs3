//데코레이터 임포트
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //엔티티 객체임을 알려주기 위한 데코레이터
export class User {
    @PrimaryGeneratedColumn()
    id?: number; //id는 pk이며 자동 증가하는 값

    @Column({ unique: true })
    email: string; //email은 유니크한 값

    @Column({ nullable: true }) //패스워드 빈 값 허용
    password: string;

    @Column()
    username: string;

    @Column({ default: true }) //기본값을 넣어줌
    createdDt: Date = new Date();

    @Column({ nullable: true }) //provider의 빈 값 허용
    providerId: string; //providerId 추가
}