import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from "./dto/createRoom.dto"
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomQuestService {
  constructor(private prisma: PrismaService) { }
  async create_room(data: CreateRoomDto, req) {
    const quests = await this.prisma.quest.findMany({
      where: {
        quizId: data.id_quiz,
      },
    });
    if (!quests) {

    }
    const newRoom = await this.prisma.room.create({
      data: {
        quizInRoom: {
          create: [
            {
              quizInRoomId: 'some-quiz-id',
              questId: quests.map((quest) => quest.id),
            },
          ],
        },
      },
    });

  }
}
