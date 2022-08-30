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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsidebarController = void 0;
const common_1 = require("@nestjs/common");
const docsidebar_service_1 = require("./docsidebar.service");
const dto_1 = require("./dto");
let DocsidebarController = class DocsidebarController {
    constructor(docsidebarService) {
        this.docsidebarService = docsidebarService;
    }
    getAll() {
        return this.docsidebarService.getAll();
    }
    getOne(id) {
        return this.docsidebarService.getOne(id);
    }
    create(dto) {
        return this.docsidebarService.create(dto);
    }
    update(id, dto) {
        return this.docsidebarService.update(id, dto);
    }
    delete(id) {
        return this.docsidebarService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocsidebarController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocsidebarController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DocsidebarDto]),
    __metadata("design:returntype", void 0)
], DocsidebarController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.DocsidebarDto]),
    __metadata("design:returntype", void 0)
], DocsidebarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocsidebarController.prototype, "delete", null);
DocsidebarController = __decorate([
    (0, common_1.Controller)('api/v1/docsidebar'),
    __metadata("design:paramtypes", [docsidebar_service_1.DocsidebarService])
], DocsidebarController);
exports.DocsidebarController = DocsidebarController;
//# sourceMappingURL=docsidebar.controller.js.map