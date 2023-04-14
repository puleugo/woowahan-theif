import { SetMetadata } from '@nestjs/common';
import { MemberRoleEnum } from '../../../../domain/member/member-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: MemberRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
