import { MemberRole } from "../../../member/interface/member-role";

export interface IAccessTokenPayload {
  username: string,
  sub: string,
  role: MemberRole.MEMBER
}
