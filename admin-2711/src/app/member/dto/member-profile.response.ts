import { MemberProfileResponseCommand } from '../interface/member-profile.response.command';

export class MemberProfileResponse implements MemberProfileResponseCommand {
  id: string;
  nickname: string;
  username: string;

  constructor({ id, nickname, username }: MemberProfileResponseCommand) {
    this.id = id;
    this.nickname = nickname;
    this.username = username;
  }
}
