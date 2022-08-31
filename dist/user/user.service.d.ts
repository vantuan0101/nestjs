import { PrismaService } from './../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.interface';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
