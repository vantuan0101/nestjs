import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [DocsController],
  providers: [DocsService],
})
export class DocsModule {}
