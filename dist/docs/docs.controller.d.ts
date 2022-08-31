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
            Doccontent: import(".prisma/client").Doccontent[];
        })[];
    }>;
    getOne(id: number): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs;
    }>;
    create(dto: DocsDto): Promise<import(".prisma/client").Docs>;
    update(id: number, dto: CreateDocs): Promise<{
        status: string;
        errCode: number;
        data: import(".prisma/client").Docs;
    }>;
    delete(id: number): Promise<string>;
}
