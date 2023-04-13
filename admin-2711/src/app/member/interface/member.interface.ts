import { MemberRole } from "./member-role";

export interface IMember {
  id: string;
  nickname: string;
  username: string;
  password: string;
  role: MemberRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
