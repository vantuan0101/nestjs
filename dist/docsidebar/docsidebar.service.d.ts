import { PrismaService } from './../prisma/prisma.service';
import { DocsidebarDto } from './dto';
export declare class DocsidebarService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): {
        status: string;
        errCode: number;
        data: any;
    };
    getOne(id: number): {
        status: string;
        errCode: number;
        data: any;
    };
    create(dto: DocsidebarDto): {
        status: string;
        errCode: number;
        data: any;
    };
    update(id: number, dto: DocsidebarDto): {
        status: string;
        errCode: number;
        data: any;
    };
    delete(id: number): string;
}
