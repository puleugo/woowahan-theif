import { IMember } from "./member.interface";

export type MemberProfileResponseCommand = Pick<IMember, 'id' | 'nickname' | 'username'>
