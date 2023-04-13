import { MemberRoleEnum } from './member-role.enum';

export interface IMember {
  id: string;
  nickname: string;
  username: string;
  password: string;
  role: MemberRoleEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
