import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import googleOauthConfig from './config/google-oauth.config';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [ConfigModule.forFeature(googleOauthConfig)],
  controllers: [OauthController],
  providers: [OauthService, GoogleStrategy],
})
export class OauthModule { }
