export declare class AuthDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ForgotPassDto {
    email: string;
}
export declare class ResetPassDto {
    password: string;
}
export declare class RefreshTokenDto {
    token: string;
}
