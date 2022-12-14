"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsModule = void 0;
const cloudinary_module_1 = require("./../cloudinary/cloudinary.module");
const common_1 = require("@nestjs/common");
const docs_controller_1 = require("./docs.controller");
const docs_service_1 = require("./docs.service");
let DocsModule = class DocsModule {
};
DocsModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudinary_module_1.CloudinaryModule],
        controllers: [docs_controller_1.DocsController],
        providers: [docs_service_1.DocsService],
    })
], DocsModule);
exports.DocsModule = DocsModule;
//# sourceMappingURL=docs.module.js.map