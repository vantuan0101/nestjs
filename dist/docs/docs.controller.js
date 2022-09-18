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
exports.DocsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/guard/roles.decorator");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_enum_1 = require("../shared/enum/roles.enum");
const jwt_guard_1 = require("./../auth/guard/jwt.guard");
const docs_service_1 = require("./docs.service");
const dto_1 = require("./dto");
let DocsController = class DocsController {
    constructor(DocsService) {
        this.DocsService = DocsService;
    }
    getAll(q, sort, limit, skip) {
        return this.DocsService.getAllDocs(q, sort, limit, skip);
    }
    getOneByName(nameApi) {
        return this.DocsService.getOneDocByName(nameApi.nameApi);
    }
    create(dto) {
        return this.DocsService.createDocs(dto);
    }
    update(id, dto) {
        return this.DocsService.updateDocs(id, dto);
    }
    delete(id) {
        return this.DocsService.deleteDocs(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('sort')),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':nameApi'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "getOneByName", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleType.Admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DocsDto]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "delete", null);
DocsController = __decorate([
    (0, common_1.Controller)('docs'),
    __metadata("design:paramtypes", [docs_service_1.DocsService])
], DocsController);
exports.DocsController = DocsController;
//# sourceMappingURL=docs.controller.js.map