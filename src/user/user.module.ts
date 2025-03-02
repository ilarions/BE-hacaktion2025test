import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { UserVerifyMiddleware } from 'src/user-verify/user-verify.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/auth.strategy';
import { AuthModule } from '../auth/auth.module';
@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  imports: [forwardRef(() => AuthModule)],


  exports: [UserService]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserVerifyMiddleware).forRoutes(UserController);
  }
}
