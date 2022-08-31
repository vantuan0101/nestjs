/// <reference types="passport" />
import { UserService } from './user.service';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(req: Request): Express.User;
    getAllUser(): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").User[];
    }>;
    createUser(user: UserDto): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").User;
    }>;
    updateUser(id: number, user: UpdateUserDto): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").User;
    }>;
    deleteUser(id: number): Promise<{
        status: string;
        errCode: number;
    }>;
}
