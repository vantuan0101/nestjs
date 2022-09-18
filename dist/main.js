"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('List of all APIs')
        .setDescription('The list of all APIs of the application. This is a sample description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: true,
    });
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map