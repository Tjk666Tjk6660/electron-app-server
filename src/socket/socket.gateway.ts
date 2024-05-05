import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: 'meeting-room',
})
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client) {
    console.log(client.handshake.query?.id);
    this.server.emit('events', {
      id: client.handshake.query.id,
    });
  }

  @SubscribeMessage('message')
  sendMessage(@MessageBody() body, @ConnectedSocket() socket: Socket) {
    socket.emit('message', body);
  }
}
