import { Controller, Get, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import * as Multer from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get')
  async get_user(@Req() req: any) {
    return this.userService.get_user(req);
  }
}
