import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/decorators/role.decorator';
import { SessionFields } from 'src/user/interfaces/session-fileds.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Role, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as SessionFields;
    return matchRoles(roles, user.permissions);
  }
}
function matchRoles(requiredRoles: string[], currentRoles: string[]): boolean {
  return currentRoles.some((cr) => requiredRoles.includes(cr));
}
