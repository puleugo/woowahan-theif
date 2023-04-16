import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Settle } from '../settle/settle.entity';
import { Market } from '../market/market.entity';

@Entity('owners')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  account: string;

  @OneToMany(() => Market, (market) => market.owner)
  markets: Market[];

  @OneToMany(() => Settle, (settle) => settle.owner)
  settles: Settle[];
}
