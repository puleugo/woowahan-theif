import { ConflictException, Injectable } from "@nestjs/common";
import {Repository} from "typeorm";
import {Member} from "./entity/member.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RegisterRequest} from "../auth/authentication/dto/register.request";
import {LoginRequest} from "../auth/authentication/dto/login.request";

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>) {
    }

    async findMemberById(id: string): Promise<Member> {
        return await this.memberRepository.findOne({where: {id}});
    }

    async findMemberByUsername(username: string): Promise<Member> {
        return await this.memberRepository.findOne({where: {username}});
    }

    async validateUsername(username: string): Promise<void> {
        const exist = await this.memberRepository.exist({where: {username}});
        if (exist) throw new ConflictException('이미 존재하는 아이디입니다.');
    }

    async validateNickname(nickname: string): Promise<void> {
        const exist = await this.memberRepository.exist({where: {nickname}});
        if (exist) throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    //TODO: 암호화 기능 구현
    async encodePassword(password: string): Promise<string> {
        return password;
    }

    async joinMember(registerRequest: RegisterRequest): Promise<Member> {
        const member = new Member();
        member.username = registerRequest.username;
        member.nickname = registerRequest.nickname;
        member.password = await this.encodePassword(registerRequest.password);

        return await this.memberRepository.save(member);
    }

    async loginMember(loginRequest: LoginRequest): Promise<Member> {
        const member = await this.memberRepository.findOne({
            where: {
                username: loginRequest.username,
                password: await this.encodePassword(loginRequest.password)
            }
        });
        if (!member) throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');

        return member;
    }
}
