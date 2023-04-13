import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {MemberRole} from "../interface/member-role";
import { IMember } from "../interface/member.interface";

@Entity('members')
export class Member implements IMember{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    nickname: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: MemberRole, default: MemberRole.MEMBER})
    role: MemberRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({nullable: true})
    deletedAt: Date | null;
}
