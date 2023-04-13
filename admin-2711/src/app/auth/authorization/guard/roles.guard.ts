import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MemberRole } from '../../../member/interface/member-role';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { getAccessTokenPayload } from '../../../../infrastructure/utils/get-access-token-payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<MemberRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const member = await getAccessTokenPayload(request);

    return requiredRoles.some((role) => member.role?.includes(role));
  }
}
