import { MemberService } from '../../member/member.service';
import { JwtResponse } from './dto/jwt.response';
import { LoginRequest } from './dto/login.request';
import { RegisterRequest } from './dto/register.request';
import { Member } from '../../../domain/member/member.entity';
import { IAccessTokenPayload } from './interface/access-token-payload.interface';
import { MemberRoleEnum } from '../../../domain/member/member-role.enum';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IRefreshTokenPayload } from './interface/refresh-token-payload.interface';
import { MemberProfileResponseCommand } from '../../member/interface/member-profile.response.command';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginRequest: LoginRequest): Promise<JwtResponse> {
    const member = await this.memberService.loginMember(loginRequest);
    if (!member) throw new UnauthorizedException();

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(member.id),
      this.generateRefreshToken(member.id),
    ]);
    return { accessToken, refreshToken };
  }

  async register(registerRequest: RegisterRequest): Promise<Member> {
    await Promise.all([
      this.memberService.validateUsername(registerRequest.username),
      this.memberService.validateNickname(registerRequest.nickname),
    ]);
    return await this.memberService.joinMember(registerRequest);
  }

  //TODO: 토큰 세부 구현
  async generateAccessToken(id: string): Promise<string> {
    const member = await this.memberService.findMemberById(id);
    if (!member) throw new UnauthorizedException();
    const payload: IAccessTokenPayload = {
      username: member.username,
      sub: member.id,
      role: MemberRoleEnum.MEMBER,
    };
    return await this.jwtService.signAsync(payload);
  }

  //TODO: 토큰 세부 구현
  async generateRefreshToken(id: string): Promise<string> {
    const member = await this.memberService.findMemberById(id);
    if (!member) throw new UnauthorizedException();
    const payload: IRefreshTokenPayload = {
      username: member.username,
      sub: member.id,
      ip: '',
    };
    return await this.jwtService.signAsync(payload);
  }

  async getMyProfile(data: {
    id: string;
    username: string;
  }): Promise<MemberProfileResponseCommand> {
    return await this.memberService.findMemberById(data.id);
  }
}
