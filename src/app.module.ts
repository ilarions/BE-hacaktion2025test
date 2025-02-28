import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
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

@Module({
  imports: [
    AuthModule,
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
})
export class AppModule { }
