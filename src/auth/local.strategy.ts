import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ContextIdFactory, ModuleRef } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super({ usernameField: 'email', passwordField: 'password', passReqToCallback: true });
  }

  async validate(request: Request, email: string, password: string): Promise<any> {
    console.log('Inside LocalStrategy validate');
    const contextId = ContextIdFactory.getByRequest(request);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log("User not found");
      throw new UnauthorizedException();
    }
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    return user;
  }
}
