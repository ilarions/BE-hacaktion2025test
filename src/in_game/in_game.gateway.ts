import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { InGameService } from './in_game.service';
import { CreateInGameDto } from './dto/create-in_game.dto';
import { UpdateInGameDto } from './dto/update-in_game.dto';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/game',
})
export class InGameGateway {
  private timers = new Map<string, NodeJS.Timeout>();
  constructor(private readonly inGameService: InGameService) { }

  @SubscribeMessage("start_question")
  async create(@MessageBody() data: CreateInGameDto, @ConnectedSocket() client: Socket) {

    const id = await this.inGameService.get_user(data)
    const res = await this.inGameService.send_quest(data, this.timers, client, id);
    console.log(res)
    client.emit('start_question', res);
  }

}
