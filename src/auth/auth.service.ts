import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // Generate the password hash
      const hash = await argon.hash(dto.password);
      // Save new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   createAt: true,
        // },
      });
      delete user.hash; //No return hash
      // return new user
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentails are invalid',
          );
        }
        throw error;
      }
    }
  }

  async signin(dto: AuthDto) {
    try {
      // find email in the db
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });

      // // if email incorrect throw error
      if (!user) {
        throw new ForbiddenException(
          'Credentails are invalid',
        );
      }
      // // compare password with hash
      const validPassword = await argon.verify(
        user.hash,
        dto.password,
      );
      if (!validPassword) {
        throw new ForbiddenException(
          'Credentails are invalid',
        );
      }
      // delete user.hash;
      return user;
      // return this.signToken(user.id, user.email);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  // async signToken(
  //   userId: number,
  //   email: string,
  // ): Promise<{ access_token: string }> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   const secret = this.config.get('JWT_SECRET');

  //   const token = await this.jwt.signAsync(
  //     payload,
  //     {
  //       expiresIn: '15m',
  //       secret: secret,
  //     },
  //   );

  //   return {
  //     access_token: token,
  //   };
  // }
}
