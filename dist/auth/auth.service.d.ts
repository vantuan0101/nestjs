import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
export declare class AuthService {
    private jwt;
    private prisma;
    private config;
    constructor(jwt: JwtService, prisma: PrismaService, config: ConfigService);
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: AuthDto): Promise<import(".prisma/client").User>;
}
