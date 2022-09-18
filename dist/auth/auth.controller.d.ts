import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthDto, ForgotPassDto, LoginDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: LoginDto, res: Response): Promise<{
        status: string;
        data: {
            user: import(".prisma/client").User;
            access_token: string;
        };
    }>;
    forgotPassword(dto: ForgotPassDto): Promise<{
        message: string;
        access_token: string;
    }>;
    resetPassword(password: string, token: string): Promise<import(".prisma/client").User>;
    refreshToken(request: Request): Promise<string>;
}
