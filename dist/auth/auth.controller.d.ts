import { AuthService } from './auth.service';
import { AuthDto, ForgotPassDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    forgotPassword(dto: ForgotPassDto): Promise<{
        message: string;
        access_token: {
            access_token: string;
        };
    }>;
    resetPassword(password: string, token: string): Promise<import(".prisma/client").User>;
}
