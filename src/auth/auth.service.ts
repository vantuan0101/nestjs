import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { message: 'Signing up' };
  }
  signin() {
    return { message: 'Signing in' };
  }
}
