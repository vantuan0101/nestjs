import { PrismaService } from '../prisma/prisma.service';
import { DocsDto } from './dto';
export declare class DocsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    create(dto: DocsDto): import(".prisma/client").Prisma.Prisma__DocsClient<import(".prisma/client").Docs>;
    update(id: number, dto: DocsDto): {
        status: string;
        errCode: number;
        data: import(".prisma/client").Prisma.Prisma__DocsClient<import(".prisma/client").Docs>;
    };
    delete(id: number): string;
}
