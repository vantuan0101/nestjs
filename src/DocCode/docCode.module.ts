import { Module } from '@nestjs/common';
import { DocCodeService } from './docCode.service';
import { DocCodeController } from './docCode.controller';

@Module({
  providers: [DocCodeService],
  controllers: [DocCodeController],
})
export class DocCodeModule {}
