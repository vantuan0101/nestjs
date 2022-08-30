import { DocsidebarService } from './docsidebar.service';
import { DocsidebarDto } from './dto';
export declare class DocsidebarController {
    private docsidebarService;
    constructor(docsidebarService: DocsidebarService);
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
