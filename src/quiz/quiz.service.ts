import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
const S3 = require('aws-sdk/clients/s3');
import * as Multer from 'multer';
import { create_photo } from '../utils/create_photo';
import { remove_photo } from '../utils/manager_photo';
import { AwsService } from '../aws/aws.service';
@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsService: AwsService
  ) { }
  async get(page: number, limit: number) {
    try {
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
    } catch (e) {
      throw new NotFoundException(e);
    }

  }

  async get_one(id: string) {
    try {
      const quiz = await this.prisma.quiz.findFirst({
        where: {
          id: id,
        },
        include: {
          quests: {
            include: {
              answers: true,
            }
          }
          , questComplete: true
        },
      });
      return quiz
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async create_quiz(file: Multer.File, data, req) {
    try {
      let img = '';
      console.log(file)

      if (file?.mainImg && file.mainImg.length > 0) {
        img = await this.awsService.createPhoto(file.mainImg[0]);
        console.log(img)
      }
      const quiz = await this.prisma.quiz.create({
        data: {
          title: data.title,
          description: data.description,
          rating: 0,
          img: img,
          time: data.time,
          quests: { connect: [] },
          questComplete: { connect: [] },
          authorId: req.user.id,
        },
      });
      return quiz;
    } catch (e) {
      console.log(e)
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
          authorId: req.user.id,
        },
        data: data,
        include: {
          quests: {
            include: {
              answers: true,
            }

          }
        }
      });
      let update_quiz = quiz

      if (file?.mainImg && file.mainImg.length > 0) {
        if (quiz.img && quiz.img !== '') {
          await remove_photo(quiz.img);
        }
        const img = await create_photo(file.mainImg[0]);
        update_quiz = await this.prisma.quiz.update({
          where: {
            id: id,
            authorId: req.user.id,
          },
          data: {
            ...data,
            img,
          },
          include: {
            quests: {
              include: {
                answers: true,
              }

            }
          }
        });

      }
      return { update_quiz };
    } catch (e) {
      console.log(e)
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
          authorId: req.user.id,
        },
      });
      return 'remove successfully';
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
