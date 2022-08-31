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
exports.UserService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const argon = require("argon2");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUser() {
        try {
            const users = await this.prisma.user.findMany();
            return {
                status: 'success',
                errCode: 0,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async createUser(user) {
        console.log(user);
        try {
            const hash = await argon.hash(user.password);
            const users = await this.prisma.user.create({
                data: {
                    email: user.email,
                    hash,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            });
            return {
                status: 'success',
                errCode: 0,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async updateUser(id, user) {
        console.log(user);
        try {
            const hash = await argon.hash(user === null || user === void 0 ? void 0 : user.password);
            const users = await this.prisma.user.update({
                where: { id },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    hash,
                },
            });
            return {
                status: 'success',
                errCode: 0,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async deleteUser(id) {
        try {
            await this.prisma.user.delete({
                where: { id },
            });
            return {
                status: 'success',
                errCode: 0,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map