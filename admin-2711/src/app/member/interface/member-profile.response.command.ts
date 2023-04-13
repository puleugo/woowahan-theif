import { IMember } from '../../../domain/member/member.interface';

export type MemberProfileResponseCommand = Pick<
  IMember,
  'id' | 'nickname' | 'username'
>;
