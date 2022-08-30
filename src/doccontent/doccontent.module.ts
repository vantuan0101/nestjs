import { Module } from '@nestjs/common';
import { DoccontentService } from './doccontent.service';

@Module({
  providers: [DoccontentService]
})
export class DoccontentModule {}
