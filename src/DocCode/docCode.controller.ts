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
  UseGuards,
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
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(RoleType.Admin)
  create(@Body() dto: DocCodeDto) {
    // console.log(dto);
    return this.DocCodeService.createDocCode(dto);
  }
  @Patch(':id')
  // @UseGuards(JwtGuard, RolesGuard)
  // @Roles(RoleType.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DocCodeEntry,
  ) {
    return this.DocCodeService.updateDocCode(
      id,
      dto,
    );
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.DocCodeService.deleteDocCode(id);
  }
}
