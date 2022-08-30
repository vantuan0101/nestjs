import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  // signup(@Req() req: Request)
  // ParseIntPipe : Convert number to string
  // signup(@Body('email') email : string, @Body('password' , ParseIntPipe) password : string)
  signup(@Body() dto: AuthDto) {
    // console.log({ dto });
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
