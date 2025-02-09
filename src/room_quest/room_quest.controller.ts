import { Controller } from '@nestjs/common';
import { RoomQuestService } from './room_quest.service';

@Controller('room-quest')
export class RoomQuestController {
  constructor(private readonly roomQuestService: RoomQuestService) {}
}
