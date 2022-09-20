/// <reference types="multer" />
import { DocsService } from './docs.service';
import { DocsDto } from './dto';
import { CreateDocs } from './interface';
export declare class DocsController {
    private DocsService;
    constructor(DocsService: DocsService);
    getAll(q?: string, sort?: string, limit?: number, skip?: number): Promise<{
        status: string;
        errCode: number;
        data: (import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
        })[];
    }>;
    getOne(id: number): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
        };
    }>;
    getOneByName(nameApi: {
        nameApi: string;
    }): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
        };
    }>;
    create(dto: DocsDto, files: {
        image?: Express.Multer.File[];
        demoList?: Express.Multer.File[];
        icon?: Express.Multer.File[];
    }): Promise<import(".prisma/client").Docs>;
    update(id: number, dto: CreateDocs, files: {
        image?: Express.Multer.File[];
        demoList?: Express.Multer.File[];
        icon?: Express.Multer.File[];
    }): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs;
    }>;
    delete(id: number): Promise<{
        status: string;
        errCode: number;
    }>;
}
