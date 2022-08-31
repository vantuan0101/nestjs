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
exports.DoccontentService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let DoccontentService = class DoccontentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllDocContent() {
        try {
            const doccontent = await this.prisma.doccontent.findMany();
            return {
                status: 'success',
                errCode: 0,
                data: doccontent,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async getOneDocContent(id) {
        try {
            const doccontent = await this.prisma.doccontent.findUnique({
                where: {
                    id,
                },
            });
            return {
                status: 'success',
                errCode: 0,
                data: doccontent,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async createDocContent(dto) {
        try {
            const doccontent = await this.prisma.doccontent.create({
                data: {
                    data: dto.data,
                    docsId: +dto.docsId,
                },
            });
            return {
                status: 'success',
                errCode: 0,
                data: doccontent,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async updateDocContent(id) {
        try {
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async deleteDocContent(id) {
        try {
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
};
DoccontentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoccontentService);
exports.DoccontentService = DoccontentService;
//# sourceMappingURL=doccontent.service.js.map