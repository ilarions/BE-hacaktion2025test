import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/auth.strategy';


@Module({
  controllers: [QuizController],
  imports: [AuthModule],
  providers: [QuizService, PrismaService, JwtStrategy],
})
export class QuizModule { }
