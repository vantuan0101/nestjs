import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles || roles.length == 0) {
      return true;
    }

    const { user } = context
      .switchToHttp()
      .getRequest();
    // console.log(roles);
    // console.log(user);
    return roles.some((role) =>
      user.role?.includes(role),
    );
  }
}
