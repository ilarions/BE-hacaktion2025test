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
  @Post('registretion')
  registretion(
    @Body() data: IRegistretion,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.registretion(data, res);
  }
}
