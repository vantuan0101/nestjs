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
    getAll() {
        try {
            const Docss = this.prisma.docs.findMany();
            return {
                status: 'success',
                errCode: 0,
                data: Docss,
            };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    getOne(id) {
        try {
            const Docs = this.prisma.docs.findUnique({
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
    create(dto) {
        console.log(dto);
        try {
            const Docs = this.prisma.docs.create({
                data: {
                    name: dto.name,
                    title: dto.title,
                    slug: dto.slug,
                },
            });
            return Docs;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    update(id, dto) {
        console.log(dto);
        try {
            const Docs = this.prisma.docs.update({
                where: { id },
                data: {},
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
    delete(id) {
        return `deleted Docs service with id: ${id}`;
    }
};
DocsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocsService);
exports.DocsService = DocsService;
//# sourceMappingURL=docs.service.js.map