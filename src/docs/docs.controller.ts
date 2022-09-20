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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
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
  @Get('name/:nameApi')
  getOneByName(
    @Param() nameApi: { nameApi: string },
  ) {
    // console.log(nameApi);
    return this.DocsService.getOneDocByName(
      nameApi.nameApi,
    );
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'demoList', maxCount: 2 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  create(
    @Body() dto: DocsDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      demoList?: Express.Multer.File[];
      icon?: Express.Multer.File[];
    },
  ) {
    return this.DocsService.createDocs(
      dto,
      files,
    );
  }
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'demoList', maxCount: 2 },
      { name: 'icon', maxCount: 1 },
    ]),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    dto: CreateDocs,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      demoList?: Express.Multer.File[];
      icon?: Express.Multer.File[];
    },
  ) {
    return this.DocsService.updateDocs(
      id,
      dto,
      files,
    );
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.DocsService.deleteDocs(+id);
  }
}
