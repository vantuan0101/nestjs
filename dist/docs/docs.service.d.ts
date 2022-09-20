import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { DocsDto } from './dto';
import { CreateDocs } from './interface';
export declare class DocsService {
    private prisma;
    cloudinary: CloudinaryService;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    getAllDocs(q?: string, sort?: string, limit?: number, skip?: number): Promise<{
        status: string;
        errCode: number;
        data: (import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
        })[];
    }>;
    getOneDocs(id: number): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
        };
    }>;
    getOneDocByName(nameApi: string): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
        };
    }>;
    createDocs(dto: DocsDto, files: any): Promise<import(".prisma/client").Docs>;
    updateDocs(id: number, dto: CreateDocs, files: any): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs;
    }>;
    deleteDocs(id: number): Promise<{
        status: string;
        errCode: number;
    }>;
}
