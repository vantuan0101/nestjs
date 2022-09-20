import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  AuthDto,
  ForgotPassDto,
  LoginDto,
} from './dto';

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
  // Login
  @Post('signin')
  signin(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(dto);

    return this.authService.signin(dto, res);
  }
  @Get('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(res);
  }
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPassDto) {
    return this.authService.forgotPassword(dto);
  }
  @Post('reset-password')
  resetPassword(
    @Body('password') password: string,
    @Query('token') token: string,
  ) {
    // console.log({ password, token });
    return this.authService.resetPassword(
      password,
      token,
    );
  }
  @Post('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.authService.refreshToken(
      request.cookies.refresh_token,
    );
  }
}
