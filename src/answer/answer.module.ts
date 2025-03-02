import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserVerifyMiddleware } from 'src/user-verify/user-verify.middleware';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AnswerController],
  imports: [AuthModule],
  providers: [AnswerService, PrismaService],
})
export class AnswerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserVerifyMiddleware)
      .forRoutes(AnswerController);
  }

}
