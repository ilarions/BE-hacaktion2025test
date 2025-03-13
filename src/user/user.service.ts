import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChangeNameDto } from './dto/userChangeName.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async findOne(email: string): Promise<any | undefined> {
    return await this.prisma.user.findFirst({ where: { email: email } })
  }
  async get_user(req) {
    try {
      const user = this.prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
        include: { yourQuiz: true, questComplete: true },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async change_name(data: ChangeNameDto, req) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: req.id
        },
        data: {
          name: data.name
        }
      })
      return user
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
