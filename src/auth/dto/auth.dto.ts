import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ForgotPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class ResetPassDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
