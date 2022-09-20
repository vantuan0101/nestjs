import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, ForgotPassDto, LoginDto } from './dto';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
export declare class AuthService {
    private jwt;
    private prisma;
    private config;
    private mailService;
    constructor(jwt: JwtService, prisma: PrismaService, config: ConfigService, mailService: MailService);
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: LoginDto, res: Response): Promise<{
        status: string;
        data: {
            user: import(".prisma/client").User;
            access_token: string;
        };
    }>;
    logout(res: Response): Promise<{
        status: string;
        message: string;
    }>;
    signToken(userId: number, email: string): Promise<string>;
    signRefreshToken(userId: number, email: string): Promise<string>;
    verifyToken(token: string): Promise<any>;
    forgotPassword(dto: ForgotPassDto): Promise<{
        message: string;
        access_token: string;
    }>;
    resetPassword(password: string, token: string): Promise<import(".prisma/client").User>;
    refreshToken(refresh_token: string): Promise<string>;
}
