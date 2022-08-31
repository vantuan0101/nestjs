import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, ForgotPassDto } from './dto';
import { MailService } from '../mail/mail.service';
export declare class AuthService {
    private jwt;
    private prisma;
    private config;
    private mailService;
    constructor(jwt: JwtService, prisma: PrismaService, config: ConfigService, mailService: MailService);
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<{
        access_token: string;
    }>;
    verifyToken(token: string): Promise<any>;
    forgotPassword(dto: ForgotPassDto): Promise<{
        message: string;
        access_token: {
            access_token: string;
        };
    }>;
    resetPassword(password: string, token: string): Promise<import(".prisma/client").User>;
}
