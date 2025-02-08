import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as Multer from 'multer';
import { create_photo } from 'src/utils/create_photo';
@Injectable()
export class QuestService {
  constructor(private prisma: PrismaService) {}
  async create_quest(data, req, file: Multer.File) {
    try {
      const quiz = this.prisma.quiz.findFirst({
        where: {
          id: data.id,
        },
      });
      if (!quiz) {
        throw new UnauthorizedException('email not found');
      }
      let img = '';
      if (file?.mainImg && file.mainImg.length > 0) {
        img = await create_photo(file.mainImg[0]);
      }
      const quest = await this.prisma.quest.create({
        data: {
          title: data.quest,
          type: data.type,
          quizId: data.id,
          answers: {
            create: data.answer,
          },
        },
        include: {
          answers: true,
        },
      });
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
