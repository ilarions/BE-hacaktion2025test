import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './strategies/auth.strategy';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';

import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../constants';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [UserModule, PassportModule.register({ session: true }), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  exports: [JwtModule]
})
export class AuthModule { }
