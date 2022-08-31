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
exports.DocsService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let DocsService = class DocsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllDocs(q, sort, limit, skip) {
        try {
            const Docs = await this.prisma.docs.findMany({
                take: limit,
                skip: skip,
                orderBy: [
                    sort && {
                        name: sort,
                    },
                ],
                include: {
                    CodeBlock: true,
                    Doccontent: true,
                },
                where: {
                    OR: q && [
                        {
                            name: {
                                contains: q,
                            },
                        },
                    ],
                },
            });
            return {
                status: 'success',
                errCode: 0,
                data: Docs,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async getOneDocs(id) {
        try {
            const Docs = await this.prisma.docs.findUnique({
                where: { id },
            });
            return {
                status: 'success',
                errCode: 0,
                data: Docs,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async createDocs(dto) {
        try {
            const Docs = await this.prisma.docs.create({
                data: {
                    name: dto.name,
                    title: dto.title.split(','),
                    slug: dto.slug.split(','),
                },
            });
            return Docs;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async updateDocs(id, dto) {
        var _a, _b;
        const data = {
            name: dto === null || dto === void 0 ? void 0 : dto.name,
            title: (_a = dto === null || dto === void 0 ? void 0 : dto.title) === null || _a === void 0 ? void 0 : _a.split(','),
            slug: (_b = dto === null || dto === void 0 ? void 0 : dto.slug) === null || _b === void 0 ? void 0 : _b.split(','),
        };
        try {
            const Docs = await this.prisma.docs.update({
                where: { id },
                data,
            });
            return {
                status: 'success',
                errCode: 0,
                data: Docs,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async deleteDocs(id) {
        return `deleted Docs service with id: ${id}`;
    }
};
DocsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocsService);
exports.DocsService = DocsService;
//# sourceMappingURL=docs.service.js.map