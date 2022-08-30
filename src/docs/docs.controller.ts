import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsDto } from './dto';

@Controller('docs')
export class DocsController {
  constructor(private DocsService: DocsService) {}
  @Get()
  getAll() {
    return this.DocsService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.DocsService.getOne(id);
  }
  @Post()
  create(@Body() dto: DocsDto) {
    console.log({ dto });

    return 'this.DocsService.create(dto);';
    // return this.DocsService.create(dto);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: DocsDto,
  ) {
    return this.DocsService.update(id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.DocsService.delete(id);
  }
}
