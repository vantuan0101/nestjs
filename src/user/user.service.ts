import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2';
import { UpdateUserDto } from './dto/updateUser.interface';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser() {
    try {
      const users =
        await this.prisma.user.findMany();
      return {
        status: 'success',
        errCode: 0,
        data: users,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async createUser(user: UserDto) {
    console.log(user);
    try {
      const hash = await argon.hash(
        user.password,
      );
      const users = await this.prisma.user.create(
        {
          data: {
            email: user.email,
            hash,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      );
      return {
        status: 'success',
        errCode: 0,
        data: users,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async updateUser(
    id: number,
    user: UpdateUserDto,
  ) {
    console.log(user);
    try {
      const hash = await argon.hash(
        user?.password,
      );
      const users = await this.prisma.user.update(
        {
          where: { id },
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hash,
          },
        },
      );
      return {
        status: 'success',
        errCode: 0,
        data: users,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
  async deleteUser(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return {
        status: 'success',
        errCode: 0,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Credentails are invalid',
      );
    }
  }
}
