import { Module } from '@nestjs/common';
import { DoccontentService } from './doccontent.service';
import { DoccontentController } from './doccontent.controller';

@Module({
  providers: [DoccontentService],
  controllers: [DoccontentController],
})
export class DoccontentModule {}
