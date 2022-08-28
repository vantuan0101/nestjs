import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(): {
        message: string;
    };
    signin(): {
        message: string;
    };
}
