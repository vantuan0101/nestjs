"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
const runtime_1 = require("@prisma/client/runtime");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const html_to_text_1 = require("html-to-text");
let AuthService = class AuthService {
    constructor(jwt, prisma, config, mailService) {
        this.jwt = jwt;
        this.prisma = prisma;
        this.config = config;
        this.mailService = mailService;
    }
    async signup(dto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    hash,
                },
            });
            delete user.hash;
            return user;
        }
        catch (error) {
            if (error instanceof
                runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentails are invalid');
                }
                throw error;
            }
        }
    }
    async signin(dto, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('Credentails are invalid');
            }
            const validPassword = await argon.verify(user.hash, dto.password);
            if (!validPassword) {
                throw new common_1.ForbiddenException('Credentails are invalid');
            }
            delete user.hash;
            delete user.createAt;
            delete user.updateAt;
            delete user.id;
            const access_token = await this.signToken(user.id, user.email);
            const refresh_token = await this.signRefreshToken(user.id, user.email);
            res.cookie('refresh_token', refresh_token);
            return {
                status: 'success',
                data: {
                    user,
                    access_token,
                },
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException(error);
        }
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1s',
            secret: secret,
        });
        return token;
    }
    async signRefreshToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
            secret: secret,
        });
        return token;
    }
    async verifyToken(token) {
        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: this.config.get('JWT_SECRET'),
            });
            return payload;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error);
        }
    }
    async forgotPassword(dto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });
            if (!user) {
                throw new common_1.ForbiddenException('Credentails are invalid');
            }
            const token = await this.signToken(user.id, user.email);
            const url = `${this.config.get('BASE_URL')}/api/v1/reset-password?token=${token}`;
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
            const htmlContent = (0, html_to_text_1.convert)(html, {
                wordwrap: 130,
            });
            const mail = {
                to: user.email,
                subject: 'Reset Password',
                htmlContent,
            };
            await this.mailService.sendUserConfirmation(mail);
            return {
                message: 'Email sent',
                access_token: token,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException(error);
        }
    }
    async resetPassword(password, token) {
        try {
            const payload = await this.verifyToken(token);
            const user = await this.prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            });
            const hash = await argon.hash(password);
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    hash,
                },
            });
            delete updatedUser.hash;
            return updatedUser;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error);
        }
    }
    async refreshToken(refresh_token) {
        try {
            const payload = await this.verifyToken(refresh_token);
            const newToken = await this.signToken(payload.sub, payload.email);
            return newToken;
        }
        catch (error) {
            throw new common_1.ForbiddenException(error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map