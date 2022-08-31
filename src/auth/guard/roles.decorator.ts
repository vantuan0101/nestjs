import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/shared/enum/roles.enum';

export const Roles = (...args: RoleType[]) =>
  SetMetadata('roles', args);
