import { Module, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OauthModule } from './oauth/oauth.module';
import { QuestModule } from './quest/quest.module';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { InGameModule } from './in_game/in_game.module';
import { AnswerModule } from './answer/answer.module';
import { RoomQuestModule } from './room_quest/room_quest.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

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
    AwsModule,
  ],
  providers: [JwtService],
})
export class AppModule { }
