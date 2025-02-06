import { Injectable } from '@nestjs/common';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ILogin } from './dto/login.dto';
import { IRegistretion } from './dto/register.dto';
import { PrismaService } from 'src/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async registretion(data: IRegistretion, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (user) {
        throw new NotFoundException('this email was used');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashedPassword,
          iconImg: '',
        },
      });
      const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
        expiresIn: '1h',
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.cookie('token', token);
      return 'This action returns all cats';
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async login(data: ILogin, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new NotFoundException('This email is not registered');
      }

      const verifyPassword = bcrypt.compareSync(data.password, user.password);
      if (!verifyPassword) {
        throw new UnauthorizedException('Incorrect email or password');
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: '1h',
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return token;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
