import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from "./dto/createRoom.dto"
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomQuestService {
  constructor(private prisma: PrismaService) { }
  async create_room(data: CreateRoomDto, req) {
    try {
      const quests = await this.prisma.quest.findMany({
        where: {
          quizId: data.id_quiz,
        },
        include: { answers: true }
      });
      console.log(quests)
      if (!quests || quests.length == 0) {
        throw new NotFoundException("cannot find quiz or this quiz doesnt have quest");
      }
      const newRoom = await this.prisma.room.create({
        data: {
          quizInRoomId: data.id_quiz,
          questId: quests.map((quest) => quest.id),

          userInRoom: {
            create: [
              {
                userId: req.id,
                correctAnswer: 0,
                time: 0,
              },
            ],
          },


        },
      });
      return newRoom
    } catch (e) {
      console.log(e)
      throw new NotFoundException(e);
    }

  }
}
