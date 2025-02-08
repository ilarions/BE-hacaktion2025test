import { Injectable } from '@nestjs/common';
import { CreateInGameDto } from './dto/create-in_game.dto';
import { UpdateInGameDto } from './dto/update-in_game.dto';

@Injectable()
export class InGameService {
  create(createInGameDto: CreateInGameDto) {
    return 'This action adds a new inGame';
  }


}
