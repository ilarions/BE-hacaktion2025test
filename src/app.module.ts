import { Module, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserVerifyMiddleware } from './user-verify/user-verify.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { OauthModule } from './oauth/oauth.module';
import { QuestModule } from './quest/quest.module';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { InGameModule } from './in_game/in_game.module';
import { AnswerModule } from './answer/answer.module';
import { RoomQuestModule } from './room_quest/room_quest.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forRoot(),
    PrismaModule,
    OauthModule,
    QuestModule,

    QuizModule,
    UserModule,
    InGameModule,
    AnswerModule,
    RoomQuestModule,
  ],
  providers: [JwtService],
})
export class AppModule { }
