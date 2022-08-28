import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
