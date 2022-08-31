import { DocContentDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
export declare class DoccontentService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllDocContent(): Promise<{
        status: string;
        errCode: number;
        data: any;
    }>;
    getOneDocContent(id: number): Promise<{
        status: string;
        errCode: number;
        data: any;
    }>;
    createDocContent(dto: DocContentDto): Promise<{
        status: string;
        errCode: number;
        data: any;
    }>;
    updateDocContent(id: number): Promise<void>;
    deleteDocContent(id: number): Promise<void>;
}
