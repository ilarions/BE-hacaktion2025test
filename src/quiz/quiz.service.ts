import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
const S3 = require('aws-sdk/clients/s3');
import * as Multer from 'multer';
import { create_photo } from 'src/utils/create_photo';
import { remove_photo } from 'src/utils/remove_photo';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}
  async get(page, limit) {
    const skip = (page - 1) * limit;
    const [quiz, total] = await Promise.all([
      this.prisma.quiz.findMany({
        skip,
        take: limit,
      }),
      this.prisma.quiz.count(),
    ]);
    return {
      data: quiz,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async get_one(id,req) {
    try {
      const quiz = this.prisma.quiz.findFirst({
        where: {
          id: id,
        },
        include: { quests: true, questComplete: true },
      });
       let author=false
      if(quiz.author==req.id){
          author=true
      }
      return {quiz:quiz,
        author:author};
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async create_quiz(file: Multer.File, data, req) {
    try {
      let img = '';
      if (file?.mainImg && file.mainImg.length > 0) {
        img = await create_photo(file.mainImg[0]);
      }
      const time = new Date().toString();
      const quiz = await this.prisma.quiz.create({
        data: {
          title: data.title,
          description: data.description,
          rating: 0,
          img: img,
          time: time,
          quests: { connect: [] },
          questComplete: { connect: [] },
          authorId: req.id,
        },
      });
      console.log(quiz);
      return quiz;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async change_quiz(file: Multer.File, data, req) {
    try {
      const id = data.id;
      delete data.id;
      const quiz = await this.prisma.quiz.update({
        where: {
          id: id,
          authorId: req.id,
        },
        data: data,
      });

      if (file?.mainImg && file.mainImg.length > 0) {
        if (quiz.img && quiz.img !== '') {
          await remove_photo(quiz.img);
        }

        const img = await create_photo(file.mainImg[0]);

        await this.prisma.quiz.update({
          where: {
            id: id,
            authorId: req.id,
          },
          data: {
            ...data,
            img,
          },
        });
      }
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async remove_quiz(id, req) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: { id: id },
      });
      if (!quiz) {
        throw new UnauthorizedException('Quiz not found');
      }
      if (quiz.img && quiz.img != '') {
        await remove_photo(quiz.img);
      }
      await this.prisma.quiz.delete({
        where: {
          id: id,
          authorId: req.id,
        },
      });
      return 'remove successfully';
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
