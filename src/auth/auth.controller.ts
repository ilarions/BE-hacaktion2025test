import { AuthService } from './auth.service';
import { IRegistretion } from './dto/register.dto';

import { ILogin } from './dto/login.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registretion(
    @Body() data: IRegistretion,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.registretion(data, res);
  }
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() data: ILogin, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(data, res);
  }
}
