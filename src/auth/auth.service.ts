import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import {
  AuthDto,
  ForgotPassDto,
  LoginDto,
} from './dto';
import { MailService } from '../mail/mail.service';
import { convert } from 'html-to-text';
import { Response, Request } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
    private mailService: MailService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // Generate the password hash
      const hash = await argon.hash(dto.password);
      // Save new user in the db
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
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

  async signin(dto: LoginDto, res: Response) {
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
      delete user.hash;
      delete user.createAt;
      delete user.updateAt;
      delete user.id;
      // return user;
      const access_token = await this.signToken(
        user.id,
        user.email,
      );
      const refresh_token =
        await this.signRefreshToken(
          user.id,
          user.email,
        );
      // console.log(refresh_token);
      res.cookie('refresh_token', refresh_token);
      return {
        status: 'success',
        data: {
          user,
          access_token,
        },
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '1s',
        // expiresIn: this.config.get(
        //   'JWT_EXPIRES_IN',
        // ),
        secret: secret,
      },
    );

    return token;
  }
  async signRefreshToken(
    userId: number,
    email: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: this.config.get(
          'JWT_REFRESH_EXPIRES_IN',
        ),
        secret: secret,
      },
    );

    return token;
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(
        token,
        {
          secret: this.config.get('JWT_SECRET'),
        },
      );
      return payload;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async forgotPassword(dto: ForgotPassDto) {
    // console.log(dto);

    try {
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });
      if (!user) {
        throw new ForbiddenException(
          'Credentails are invalid',
        );
      }
      const token = await this.signToken(
        user.id,
        user.email,
      );
      const url = `${this.config.get(
        'BASE_URL',
      )}/api/v1/reset-password?token=${token}`;
      const html = `<table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
      <tr>
          <td>
              <![endif]-->
              <table class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                      <td>
                          <a href="${url}">Click here</a> to reset your password.
                      </td>
                  </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
          </td>
      </tr>
  </table>`;
      const htmlContent = convert(html, {
        wordwrap: 130,
      });
      const mail = {
        to: user.email,
        subject: 'Reset Password',
        htmlContent,
      };
      await this.mailService.sendUserConfirmation(
        mail,
      );
      return {
        message: 'Email sent',
        access_token: token,
      };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
  async resetPassword(
    password: string,
    token: string,
  ) {
    try {
      const payload = await this.verifyToken(
        token,
      );
      // console.log(payload);
      const user =
        await this.prisma.user.findUnique({
          where: {
            email: payload.email,
          },
        });

      const hash = await argon.hash(password);
      const updatedUser =
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            hash,
          },
        });
      delete updatedUser.hash;
      return updatedUser;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
  async refreshToken(refresh_token: string) {
    // console.log(refresh_token);
    try {
      const payload = await this.verifyToken(
        refresh_token,
      );
      // console.log(payload);
      const newToken = await this.signToken(
        payload.sub,
        payload.email,
      );
      return newToken;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
