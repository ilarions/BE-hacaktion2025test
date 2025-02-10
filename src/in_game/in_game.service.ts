import { Injectable } from '@nestjs/common';
import { CreateInGameDto } from './dto/create-in_game.dto';
import { UpdateInGameDto } from './dto/update-in_game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InGameService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateInGameDto, timers: any) {
    const room = await this.prisma.room.findFirst({
      where: {
        id: data.id
      },
      include: {
        quest: {
          include: {
            answers: true,  // Include answers related to each quest
          }
        },
        quizInRoom: true,
      },
    })
    console.log(room)
  }


}
