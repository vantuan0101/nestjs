import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  // signup(@Req() req: Request)
  signup(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.signup();
  }
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
