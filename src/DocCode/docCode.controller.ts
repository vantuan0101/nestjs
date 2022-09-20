import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../auth/guard/roles.guard';
import { DocCodeService } from './docCode.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { Roles } from '../auth/guard/roles.decorator';
import { RoleType } from '../shared/enum/roles.enum';
import { DocCodeDto } from './dto';
import { DocCodeEntry } from './entries/docCode.entries';

@Controller('doc/code')
export class DocCodeController {
  constructor(
    private DocCodeService: DocCodeService,
  ) {}

  @Get()
  getAll() {
    return this.DocCodeService.getAllDocCode();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.DocCodeService.getOneDocCode(id);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'icon', maxCount: 1 },
    ]),
  )
  create(
    @Body() dto: DocCodeDto,
    @UploadedFiles()
    files: {
      icon?: Express.Multer.File[];
    },
  ) {
    // console.log(dto);
    return this.DocCodeService.createDocCode(
      dto,
      files,
    );
  }
  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'icon', maxCount: 1 },
    ]),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DocCodeEntry,
    @UploadedFiles()
    files: {
      icon?: Express.Multer.File[];
    },
  ) {
    return this.DocCodeService.updateDocCode(
      id,
      dto,
      files,
    );
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.DocCodeService.deleteDocCode(id);
  }
}
