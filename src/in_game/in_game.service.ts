import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateInGameDto } from './dto/create-in_game.dto';
import { UpdateInGameDto } from './dto/update-in_game.dto';
import { PrismaService } from 'src/prisma.service';
import { Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { decode } from 'node:querystring';

@Injectable()
export class InGameService {
  constructor(private prisma: PrismaService) { }
  interval(time_end: number) {
    let timer = 0
    setInterval(() => {
      timer++
      if (timer == time_end) {

      }
    }, 1000)
  }
  async send_quest(data: CreateInGameDto, timers: any, client: Socket, user_id: string) {
    console.log(":AA")
    const room = await this.prisma.room.findFirst({
      where: {
        id: data.id
      },
      include: {
        quest: {
          include: {
            answers: true,
          }
        },
        quizInRoom: true,
      },
    })
    if (!room) {
      console.log("k")
      throw new UnauthorizedException('Token is required');
    }


    console.log(room)



    if (!timers[data.id]) {
      timers[data.id] = { time: 0, user: [] };
    }
    const user = timers[data.id].user.find(u => u.user_id === user_id);

    if (!user) {

      timers[data.id].user.push({
        status: false,
        socket: client,
        user_id: user_id
      })
    } else {
      user.socket = client;
    }
    if (!room.currentQuest || room.currentQuest == "") {
      const quest = room.quest[0];
      await this.new_current_quest(quest.id, room.id)

      const updatedData = this.reforme_quest(quest)

      return updatedData
    }
    const quest = await this.prisma.quest.findFirst({
      where: {
        id: room.currentQuest
      },
      include: {
        answers: true,
      }
    })
    if (!quest) {
      throw new UnauthorizedException('Token is required');
    }
    const updatedData = this.reforme_quest(quest)



    return updatedData







    timers[data.id].timers = setTimeout(() => {

    },)
  }
  async reforme_quest(quest: any) {
    const updatedData = {
      ...quest,
      answers: quest.answers.map(({ isCorrect, ...rest }) => rest)
    };
    return updatedData;
  }
  async new_current_quest(quest_id: string, room_id: string) {


    await this.prisma.room.update({
      where: {
        id: room_id
      },
      data: {
        currentQuest: quest_id
      }
    })
  }
  async get_user(data: CreateInGameDto) {
    try {
      console.log("aa")
      const token = data.token
      if (!token) {
        throw new UnauthorizedException('Token is required');
      }

      const decoded = jwt.verify(token, process.env.SECRET);
      if (!decoded) {
        throw new UnauthorizedException('Token is required');
      }
      console.log(decoded.id)
      return decoded.id

    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

  }

}
