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
const cloudinary_service_1 = require("./../cloudinary/cloudinary.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let DocsService = class DocsService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
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
                include: {
                    CodeBlock: true,
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
    async getOneDocByName(nameApi) {
        try {
            const Docs = await this.prisma.docs.findFirst({
                where: {
                    slug: nameApi,
                },
                include: {
                    CodeBlock: true,
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
    async createDocs(dto, files) {
        try {
            const image = await this.cloudinary.uploadCloud(files.image);
            const demoList = await this.cloudinary.uploadCloud(files.demoList);
            const icon = await this.cloudinary.uploadCloud(files.icon);
            const Docs = await this.prisma.docs.create({
                data: {
                    name: dto.name,
                    title: dto.title,
                    slug: dto.slug,
                    desc: dto.desc,
                    icon: icon,
                    image: image,
                    demoList: demoList,
                },
            });
            return Docs;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Credentails are invalid');
        }
    }
    async updateDocs(id, dto, files) {
        try {
            const { data } = await this.getOneDocs(id);
            if (files.image) {
                await this.cloudinary.deleteImage(data.image);
                const image = await this.cloudinary.uploadCloud(files.image);
                dto.image = image;
            }
            if (files.icon) {
                await this.cloudinary.deleteImage(data.icon);
                const icon = await this.cloudinary.uploadCloud(files.icon);
                dto.icon = icon;
            }
            if (files.demoList) {
                await this.cloudinary.deleteImage(data.demoList);
                const demoList = await this.cloudinary.uploadCloud(files.demoList);
                dto.demoList = demoList;
            }
            const Docs = await this.prisma.docs.update({
                where: { id },
                data: {
                    name: dto === null || dto === void 0 ? void 0 : dto.name,
                    title: dto === null || dto === void 0 ? void 0 : dto.title,
                    slug: dto === null || dto === void 0 ? void 0 : dto.slug,
                    desc: dto === null || dto === void 0 ? void 0 : dto.desc,
                    icon: dto === null || dto === void 0 ? void 0 : dto.icon,
                    image: dto === null || dto === void 0 ? void 0 : dto.image,
                    demoList: dto === null || dto === void 0 ? void 0 : dto.demoList,
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
    async deleteDocs(id) {
        try {
            const { data } = await this.getOneDocs(id);
            await this.cloudinary.deleteImage(data.image);
            await this.cloudinary.deleteImage(data.icon);
            await this.cloudinary.deleteImage(data.demoList);
            await this.prisma.docs.delete({
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
DocsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], DocsService);
exports.DocsService = DocsService;
//# sourceMappingURL=docs.service.js.map