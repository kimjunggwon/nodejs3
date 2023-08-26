import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

//웹 소켓 서버 설정 데코레이터
@WebSocketGateway({ namespace: 'chat' }) //네임스페이스 추가
export class ChatGateway {
    //웹소켓 서버 인스턴스
    @WebSocketServer() server: Server;

    //message 이벤트 구독 
    @SubscribeMessage('message')
    handlerMessage(socket: Socket, data: any): void {
        const { message, nickname } = data; //메시지와 닉네임을 데이터에서 추출
        //닉네임을 포함한 메시지 전송
        socket.broadcast.emit('message', `${nickname}: ${message}`);
    }
}

//room 네임스페이스 사용하는 게이트웨이
@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
    rooms = [];

    @WebSocketServer() //서버 Instance 접근을 위한 변수 선언
    server: Server;

    @SubscribeMessage('createRoom') //createRoom 핸들러 메서드
    handlerMessage(@MessageBody() data) {
        const { nickname, room } = data;
        this.rooms.push(room);
        this.server.emit('rooms', this.rooms);
    }
}