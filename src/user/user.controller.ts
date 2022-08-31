import { UserService } from './user.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { Roles } from '../auth/guard/roles.decorator';
import { RoleType } from '../shared/enum/roles.enum';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // Only User can access this route
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Req() req: Request) {
    console.log({
      user: req.user,
    });

    return req.user;
  }
  // Only Admin can access this route
  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin, RoleType.SuperAdmin)
  getAllUser() {
    return this.userService.getAllUser();
  }
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin, RoleType.SuperAdmin)
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin, RoleType.SuperAdmin)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleType.Admin, RoleType.SuperAdmin)
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.deleteUser(id);
  }
}
