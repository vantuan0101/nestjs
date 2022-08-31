import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { RoleType } from '../shared/enum/roles.enum';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { DocsService } from './docs.service';
import { DocsDto } from './dto';
import { CreateDocs } from './interface';

@Controller('docs')
export class DocsController {
  constructor(private DocsService: DocsService) {}

  @Get()
  getAll(
    @Query('q') q?: string,
    @Query('sort') sort?: string,
    @Query(
      'limit',
      new DefaultValuePipe(10),
      ParseIntPipe,
    )
    limit?: number,

    @Query(
      'skip',
      new DefaultValuePipe(0),
      ParseIntPipe,
    )
    skip?: number,
  ) {
    return this.DocsService.getAllDocs(
      q,
      sort,
      limit,
      skip,
    );
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    // console.log(id, typeof id);
    return this.DocsService.getOneDocs(id);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  create(@Body() dto: DocsDto) {
    return this.DocsService.createDocs(dto);
  }
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    dto: CreateDocs,
  ) {
    // console.log(dto);
    return this.DocsService.updateDocs(id, dto);
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.DocsService.deleteDocs(+id);
  }
}
