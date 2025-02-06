import { OauthService } from './oauth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
@Controller('auth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req, @Res() res) {
    //  const response = await this.authService.login(req.user.id);
    // res.redirect(`http://localhost:5173?token=${response.accessToken}`);
  }
}
