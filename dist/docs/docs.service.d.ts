import { PrismaService } from '../prisma/prisma.service';
import { DocsDto } from './dto';
import { CreateDocs } from './interface';
export declare class DocsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllDocs(q?: string, sort?: string, limit?: number, skip?: number): Promise<{
        status: string;
        errCode: number;
        data: (import(".prisma/client").Docs & {
            CodeBlock: import(".prisma/client").CodeBlock[];
            Doccontent: import(".prisma/client").Doccontent[];
        })[];
    }>;
    getOneDocs(id: number): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs;
    }>;
    createDocs(dto: DocsDto): Promise<import(".prisma/client").Docs>;
    updateDocs(id: number, dto: CreateDocs): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs;
    }>;
    deleteDocs(id: number): Promise<string>;
}
