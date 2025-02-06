import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserVerifyMiddleware } from './user-verify/user-verify.middleware';
import { PrismaModule } from './prisma.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), PrismaModule, OauthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserVerifyMiddleware).forRoutes('user');
  }
}
