import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { DocCodeService } from './docCode.service';
import { DocCodeController } from './docCode.controller';

@Module({
  imports: [CloudinaryModule],
  providers: [DocCodeService],
  controllers: [DocCodeController],
})
export class DocCodeModule {}
