import { MemberRoleEnum } from "../../../../domain/member/member-role.enum";

export interface IAccessTokenPayload {
  username: string,
  sub: string,
  role: MemberRoleEnum.MEMBER
}
