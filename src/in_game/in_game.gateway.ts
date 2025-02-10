import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { InGameService } from './in_game.service';
import { CreateInGameDto } from './dto/create-in_game.dto';
import { UpdateInGameDto } from './dto/update-in_game.dto';

@WebSocketGateway({
  namespace: '/game',
})
export class InGameGateway {
  private timers = new Map<string, NodeJS.Timeout>();
  constructor(private readonly inGameService: InGameService) { }

  @SubscribeMessage("start_question")
  create(@MessageBody() createInGameDto: CreateInGameDto) {
    console.log('aa')
    return this.inGameService.create(createInGameDto, this.timers);
  }

}
