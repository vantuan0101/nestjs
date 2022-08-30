import { DocsService } from './docs.service';
import { DocsDto } from './dto';
export declare class DocsController {
    private DocsService;
    constructor(DocsService: DocsService);
    getAll(): {
        status: string;
        errCode: number;
        data: import(".prisma/client").PrismaPromise<import(".prisma/client").Docs[]>;
    };
    getOne(id: number): {
        status: string;
        errCode: number;
        data: import(".prisma/client").Prisma.Prisma__DocsClient<import(".prisma/client").Docs>;
    };
    create(dto: DocsDto): string;
    update(id: number, dto: DocsDto): {
        status: string;
        errCode: number;
        data: import(".prisma/client").Prisma.Prisma__DocsClient<import(".prisma/client").Docs>;
    };
    delete(id: number): string;
}
